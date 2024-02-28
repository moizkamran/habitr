import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Flex, SimpleGrid, Text } from '@mantine/core'
import axios from 'axios'
import { IconHeartBroken } from '@tabler/icons-react'

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const HabitStruggle = ({setHabitStruggleOpen}) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [habitStruggle, setHabitStruggle] = useState(null)

    const getHabitStruggle = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/struggled-habit/${currentYear}/${currentMonth + 1}`)
            console.log(response.data)
            setHabitStruggle(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getHabitStruggle()
    }
    , [currentMonth])

  return (
    <Flex direction={'column'}>
        <Navbar type={'close'} typeClose={setHabitStruggleOpen}/>
            <Text mt={20} fz={30} fw={600}>
                Habit Analysis
            </Text>
            <Text c={'dimmed'}>
                Find out what you were struggling with in the month, or get an overview of your progress.
            </Text>

            <SimpleGrid mt={20} cols={3}>
                {months.map((month, index) => (
                    <CalendarMonths 
                    currentMonth={currentMonth}
                    setCurrentMonth={setCurrentMonth}
                    index={index}
                    key={index} month={month} />
                ))}
            </SimpleGrid>

            <Text mt={20} fz={30} fw={600} ta={'left'}>
                {months[currentMonth]}
            </Text>
            <Text c={'dimmed'}>
                For the month of {months[currentMonth]}, you struggled with the following habit.
            </Text>

            {habitStruggle && <SingleHabit habit={habitStruggle} />}
            {habitStruggle && <Reason reason={habitStruggle.reason} />}
            {habitStruggle && <OverallProgress totalHabits={habitStruggle.number_of_habits}
            numberOfHabitsCompleted={habitStruggle.number_of_habits_100}
            progress={habitStruggle.overall_completion_rate} />}

    </Flex>
  )
}

export default HabitStruggle

const CalendarMonths = ({ month, currentMonth, setCurrentMonth, index }) => {
    return (
            <Flex 
            align={'center'} justify={'center'}
            onClick={() => setCurrentMonth(months.indexOf(month))}
            style={{
                cursor: 'pointer',
                borderRadius: 20,
                border: '2px solid #F9820B',
                backgroundColor: currentMonth === index ? '#F9820B' : '#FFEBD8',
                padding: 10,
                color: currentMonth === index ? 'white' : 'black', 
                transition: '0.3s ease-in-out'
            }}
            >
                <Text>
                    {month}
                </Text>
            </Flex>
    )
}

const SingleHabit = ({ habit }) => {
    return (
        <Flex align={'center'} p={10}>
            <IconHeartBroken size={80} color={'#F9820B'} />
            <Flex direction={'column'} ml={10}>
                <Text fz={20} fw={600}>
                    {habit.habit.name}
                </Text>
                <Text c={'dimmed'}>
                    {habit.habit.description}
                </Text>
            </Flex>
        </Flex>
    )
}

const Reason = ({ reason }) => {
    return (
        <Flex align={'center'} p={10} style={{
            borderRadius: 20,
            border: '2px solid lightgrey',
            backgroundColor: 'white',
            marginTop: 10
        }}>
            <Flex direction={'column'} ml={10}>
                <Text fz={20} fw={600}>
                   Why this ranked low?
                </Text>
                <Text c={'dimmed'}>
                    {reason}
                </Text>
            </Flex>
        </Flex>
    )
}

const OverallProgress = ({ progress, totalHabits, numberOfHabitsCompleted }) => {
    return (
        <Flex direction={'column'} mt={20}>
            <Text fz={30} fw={600}>
                Overall Progress
            </Text>
            <Text c={'dimmed'}>
                Get an overview of your progress for the month.
            </Text>
            <Flex align={'center'} justify={'space-between'}
             style={{
                borderRadius: 20,
                border: '2px solid lightgrey',
                backgroundColor: 'white',
                padding: "10px 18px"
            }}
             mt={10}>
                <Text fz={20} fw={600}>
                    {progress.toFixed(1)}%
                </Text>
                <Flex align={'center'}>
                    <Text>
                        Completion Rate
                    </Text>
                </Flex>
                </Flex>
            <Flex align={'center'} justify={'space-between'} 
            style={{
                borderRadius: 20,
                border: '2px solid lightgrey',
                backgroundColor: 'white',
                padding: "10px 18px"
            }}
            mt={10}>
                <Text fz={20} fw={600}>
                    {numberOfHabitsCompleted}
                </Text>
                <Flex align={'center'}>
                    <Text>
                        Habits Completed
                    </Text>
                </Flex>
                </Flex>
            <Flex align={'center'} justify={'space-between'} mt={10}
             style={{
                borderRadius: 20,
                border: '2px solid lightgrey',
                backgroundColor: 'white',
                padding: "10px 18px"
            }}
            >
                <Text fz={20} fw={600}>
                    {totalHabits}
                </Text>
                <Flex align={'center'}>
                    <Text>
                        Total Habits
                    </Text>
                </Flex>
                </Flex>
        </Flex>
    )
}