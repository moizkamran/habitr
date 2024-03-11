import { ActionIcon, Flex, Text } from '@mantine/core'
import { IconCheck, IconChessBishop, IconChevronCompactLeft, IconChevronLeft, IconCircle, IconCircleFilled, IconTrash, IconYoga } from '@tabler/icons-react'
import axios from 'axios'
import React, { useState } from 'react'
import Confetti from 'react-confetti'
import { useViewportSize } from '@mantine/hooks'

const bg_colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#118ab2"]

const TodaysHabits = ({ todaysDate, habits, getHabits }) => {
    const { width, height } = useViewportSize()
    const [callForConfetti, setCallForConfetti] = useState(false)

    const filteredHabits = habits.filter(habit => {
        // Parse start_date without time component
        const start_date = new Date(habit.start_date);
        start_date.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
    
        const goal_date = new Date(habit.goal_date);
    
        // Remove time component from todaysDate
        const todayWithoutTime = new Date(todaysDate);
        todayWithoutTime.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
    
        // Keep the previous filtering logic
        let meetsFilteringCriteria =
            start_date <= todayWithoutTime &&
            goal_date >= todayWithoutTime &&
            !habit.completions.some(completion => {
                const completion_date = new Date(completion.completion_date);
                completion_date.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
                return completion_date.getTime() === todayWithoutTime.getTime();
            });
    
        // Additional logic for weekly and monthly habits
        if (meetsFilteringCriteria) {
            switch (habit.frequency) {
                case "daily":
                    // No additional filtering needed for daily habits
                    break;
                case "weekly":
                    // Check if the habit has any completion date in the current week
                    const currentWeekCompletions = habit.completions.filter(completion => {
                        const completionDate = new Date(completion.completion_date);
                        const completionWeekStart = new Date(todayWithoutTime);
                        completionWeekStart.setDate(todayWithoutTime.getDate() - todayWithoutTime.getDay()); // Start of the week
                        completionWeekStart.setHours(0, 0, 0, 0);
                        const completionWeekEnd = new Date(completionWeekStart);
                        completionWeekEnd.setDate(completionWeekStart.getDate() + 6); // End of the week
                        completionWeekEnd.setHours(23, 59, 59, 999);
                        return completionDate >= completionWeekStart && completionDate <= completionWeekEnd;
                    });
    
                    // If the habit has no completion in the current week, it meets the filtering criteria
                    meetsFilteringCriteria = currentWeekCompletions.length === 0;
                    break;
                case "monthly":
                    // Check if the habit has any completion date in the current month
                    const currentMonthCompletions = habit.completions.filter(completion => {
                        const completionDate = new Date(completion.completion_date);
                        return completionDate.getMonth() === todayWithoutTime.getMonth();
                    });
    
                    // If the habit has no completion in the current month, it meets the filtering criteria
                    meetsFilteringCriteria = currentMonthCompletions.length === 0;
                    break;
                default:
                    break;
            }
        }
    
        return meetsFilteringCriteria;
    });    

  return (
    <Flex direction={'column'} align={'center'} justify={'center'} gap={20}>
        {callForConfetti && (<Confetti
      width={width}
      height={height}
      numberOfPieces={100}
      recycle={false}
      initialVelocityX={5}
      initialVelocityY={5}
      friction={0.99}
      gravity={0.1}
      tweenDuration={1000}
      />)}
        <Flex justify={'space-between'} w={'100%'}>
            <Text mt={20} fz={20} c={'black'}>
            Tasks for today
            </Text>
            <Text mt={20} fz={20} c={'dimmed'}>
            see all
            </Text>
        </Flex>
        {/* If no tasks show nothing for today, relax! */}
        {filteredHabits.length === 0 && (
            <Text mt={20} fz={20} c={'dimmed'}>
                All done, throw a party!
            </Text>
        )}
        {filteredHabits.map((habit, index) => {
            return (
                <SingleTask key={index} todaysDate={todaysDate} setCallForConfetti={setCallForConfetti}
                habit={habit} getHabits={getHabits} />
            )
        })}
    </Flex>
  )
}

export default TodaysHabits

const SingleTask = ({ habit, getHabits, todaysDate, setCallForConfetti }) => {

    const [randomBgColor, setRandomBgColor] = useState(() => {
        // Generate random background color once when component mounts
        return bg_colors[Math.floor(Math.random() * bg_colors.length)];
      });
      
    const completions = habit.completions
    const [showHidden, setShowHidden] = useState(false)

    const todaysCompletion = completions.find(completion => {
        const completion_date = new Date(completion.completion_date)
        return completion_date.toDateString() === todaysDate.toDateString()
    }
    )
    const timezoneOffsetMs = todaysDate.getTimezoneOffset() * 60 * 1000; // Get timezone offset in milliseconds
    const localDate = new Date(todaysDate.getTime() - timezoneOffsetMs); // Adjust date to local timezone

    const formattedDate = localDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD

    //check if a streak could be formed by if completions dates has more than 2 consecutive dates
    const sortedCompletions = completions.sort((a, b) => {
        const dateA = new Date(a.completion_date);
        const dateB = new Date(b.completion_date);
        return dateA - dateB;
    });

    const streak = sortedCompletions.reduce((acc, completion, index, completions) => {
        if (index === 0) return 1;
        const completion_date = new Date(completion.completion_date);
        const prev_completion_date = new Date(completions[index - 1].completion_date);
        const diff = completion_date - prev_completion_date;
        if (diff === 86400000) {
            return acc + 1;
        } else {
            return acc;
        }
    }, 0);

    //check if streak is equal to habit.streak, if not update habit.streak
    if (streak !== habit.streak) {
        axios.put(`http://localhost:8000/api/update-habit-streak/${habit.id}`, {
            streak: streak
        })
    }

    //check if the habit's goal has been reached by checking if the streak is equal to the number of goal days, first calculate the number of days between the start date and the goal date
    const start_date = new Date(habit.start_date);
    const goal_date1 = new Date(habit.goal_date);
    const goal_days = Math.floor((goal_date1 - start_date) / (1000 * 60 * 60 * 24)) + 1;

    const completion_dates_count = completions.length

    const handleMarkAsComplete = async () => {
        try {
            axios.put(`http://localhost:8000/api/update-habit-completion/${habit.id}`, {
                completed: true
            })
            getHabits()
        } catch (error) {
            console.log(error)
        }
    }

    //if the streak is equal to the number of goal days, update the habit's completed field to true
    if (completion_dates_count === goal_days) {
        console.log(`habit ${habit.name} has been completed, because the number of completion dates ${completion_dates_count} is equal to the number of goal days ${goal_days}`)
        //check if the habit has already been completed
        if (!habit.completed) {
            setCallForConfetti(true)
            handleMarkAsComplete()
        }
        //wait for 5 seconds before setting the call for confetti to false
        setTimeout(() => {
            setCallForConfetti(false)
        }, 5000);
        console.log('habit completed')
    }

    


    const handleCompletion = async () => {
        try {
            //check if next addition will complete the habit, if yes then first update the habit's completed field to true
            if (completion_dates_count + 1 === goal_days) {
                console.log(`habit ${habit.name} will be completed, because the number of completion dates ${completion_dates_count + 1} is equal to the number of goal days ${goal_days}`)
                //check if the habit has already been completed
                if (!habit.completed) {
                    setCallForConfetti(true)
                    handleMarkAsComplete()
                }
                //wait for 5 seconds before setting the call for confetti to false
                setTimeout(() => {
                    setCallForConfetti(false)
                }, 5000);
                console.log('habit completed')
            }

            const response = await axios.post(`http://localhost:8000/api/habit-completion`, {
                habit: habit.id,
                completion_date: formattedDate,
            })
            getHabits()
        } catch (error) {
            console.log(error)
        }
    }

    const goal_date = new Date(habit.goal_date)
    const goal_days_left = Math.floor((goal_date - todaysDate) / (1000 * 60 * 60 * 24))
    const handleDeleteHabit = async () => {
        try {
            const confrim = window.confirm('Are you sure you want to delete this habit?')
            if (!confrim) return
            const response = await axios.delete(`http://localhost:8000/api/delete-habit/${habit.id}`)
            getHabits()
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Flex align={'center'} style={{
        border: '1px solid lightgrey',
        borderRadius: 20,
    }}
     justify={'space-between'} w={'100%'} p={10}>
        <Flex>
            <div
            style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: randomBgColor,
            }}
            >
                <IconChessBishop size={30} color='white'/>
            </div>
            <Flex direction={'column'} ml={20}>
                <Text fz={20} c={'black'}>
                    {habit.name ? habit.name : 'No name'}
                </Text>
                <Flex align={'center'} gap={10}>
                    <Text fz={15} c={'dimmed'}>
                        {habit.frequency ? habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1) : 'No frequency'}
                    </Text>
                    <IconCircleFilled size={5} color={'black'} />
                    <Text fz={15} c={'dimmed'}>
                        {goal_days_left} days left
                    </Text>
                    {streak > 0 && (<>
                    <IconCircleFilled size={5} color={'black'} />
                    <Text fz={15} c={'dimmed'}>
                    🔥 {streak} Streak
                    </Text>
                    </>)}
                </Flex>
            </Flex>
        </Flex>
        <Flex align={'center'} gap={10}>
            <IconChevronLeft size={20} color={'black'} onClick={() => setShowHidden(!showHidden)}/>
            {showHidden && (<ActionIcon
            size={'xl'}
            variant={'light'}
            color={'red'}
            radius={'xl'}
            onClick={handleDeleteHabit}
            >
                <IconTrash size={20} />
            </ActionIcon>)}
            <ActionIcon
            size={'xl'}
            variant={'light'}
            onClick={handleCompletion}
            color={todaysCompletion ? 'green' : 'grey'}
            radius={'xl'}
            >
                <IconCheck size={20} />
            </ActionIcon>
        </Flex>
    </Flex>
  )
}