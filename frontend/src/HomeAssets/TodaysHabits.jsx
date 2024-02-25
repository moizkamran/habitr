import { ActionIcon, Flex, Text } from '@mantine/core'
import { IconCheck, IconChessBishop, IconChevronCompactLeft, IconChevronLeft, IconCircle, IconCircleFilled, IconTrash, IconYoga } from '@tabler/icons-react'
import axios from 'axios'
import React, { useState } from 'react'

const bg_colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#118ab2"]

const TodaysHabits = ({ todaysDate, habits, getHabits }) => {
    const filteredHabits = habits.filter(habit => {
        const start_date = new Date(habit.start_date)
        const goal_date = new Date(habit.goal_date)
        const today = todaysDate

        return start_date <= today && goal_date >= today
    }
    )

  return (
    <Flex direction={'column'} align={'center'} justify={'center'} gap={20}>
        <Flex justify={'space-between'} w={'100%'}>
            <Text mt={20} fz={20} c={'black'}>
            Tasks for today
            </Text>
            <Text mt={20} fz={20} c={'dimmed'}>
            see all
            </Text>
        </Flex>
        {filteredHabits.map((habit, index) => {
            return (
                <SingleTask key={index} todaysDate={todaysDate}
                habit={habit} getHabits={getHabits} />
            )
        })}
    </Flex>
  )
}

export default TodaysHabits

const SingleTask = ({ habit, getHabits, todaysDate }) => {

    const random_bg = Math.floor(Math.random() * bg_colors.length)
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

    console.log(streak)

    //check if streak is equal to habit.streak, if not update habit.streak
    if (streak !== habit.streak) {
        axios.put(`http://localhost:8000/api/update-habit-streak/${habit.id}`, {
            streak: streak
        })
        console.log('streak updated')
    }


    const handleCompletion = async () => {
        try {
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
                backgroundColor: bg_colors[random_bg],
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