import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Flex, SimpleGrid, Text } from '@mantine/core'
import axios from 'axios'
import { motion } from 'framer-motion'
import { IconChevronDown, IconHeartBroken } from '@tabler/icons-react'

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

    const [expanded, setExpanded] = useState(false)

  return (
    <Flex direction={'column'} pos={'relative'}>
        <Navbar type={'close'} typeClose={setHabitStruggleOpen}/>
            <Text mt={20} fz={30} fw={600}>
                Habit Analysis
            </Text>
            <Text c={'dimmed'}>
                Find out what you were struggling with in the month, or get an overview of your progress.
            </Text>

            <CalendarMonths currentMonth={currentMonth} 
            month={months[currentMonth]} mt={20}
            expanded={expanded}
            setExpanded={setExpanded}
            type={'single'}
            setCurrentMonth={setCurrentMonth} />

            {expanded && (
                <SimpleGrid mt={20} cols={3}>
                    {months.map((month, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }} // Initial animation state
                            animate={{ opacity: 1, y: 0 }} // Animation when component is visible
                            exit={{ opacity: 0, y: -20 }} // Animation when component is removed
                            transition={{ duration: 0.09, delay: index * 0.1 }} // Animation duration with delay
                        >
                            <CalendarMonths
                                currentMonth={currentMonth}
                                setCurrentMonth={setCurrentMonth}
                                index={index}
                                month={month}
                                expanded={expanded}
                                setExpanded={setExpanded}
                            />
                        </motion.div>
                    ))}
                </SimpleGrid>
            )}
            <div
            style={{
                position: 'absolute',
                top: expanded ? 530 : 240,
                left: 0,
                right: 0,
                transition: '0.3s ease-in-out'
            }}
            >
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
            </div>
    </Flex>
  )
}

export default HabitStruggle

const CalendarMonths = ({ month, currentMonth, setCurrentMonth, index, type, mt, expanded, setExpanded }) => {

    const handleClick = () => {
        if (type === 'single') {
            setExpanded(!expanded)
        } else {
            setCurrentMonth(months.indexOf(month))
            setExpanded(false)
        }
    }
    return (
            <Flex 
            align={'center'} justify={'center'} mt={mt}
            onClick={handleClick}
            gap={10}
            style={{
                cursor: 'pointer',
                borderRadius: 20,
                border: '2px solid #F9820B',
                backgroundColor: type === 'single' ? "#F9820B" : (currentMonth === index ? '#F9820B' : '#FFEBD8'),
                padding: 10,
                color: type === 'single' ? "white" : (currentMonth === index ? 'white' : 'black'), 
                transition: '0.3s ease-in-out'
            }}
            >
                <Text>
                    {month}
                </Text>
                {type === 'single' && (<IconChevronDown size={20} />)}
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