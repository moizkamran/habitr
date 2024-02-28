import React from 'react'
import Navbar from './Navbar'
import { Flex, Text } from '@mantine/core'

const HabitStruggle = ({setHabitStruggleOpen}) => {
  return (
    <Flex direction={'column'}>
        <Navbar type={'close'} typeClose={setHabitStruggleOpen}/>
            <Text mt={20} fz={30} fw={600}>
                Habit Analysis
            </Text>
            <Text c={'dimmed'}>
                Find out what you were struggling with in the month, or get an overview of your progress.
            </Text>

            <CalendarMonths mt={50} />
    </Flex>
  )
}

export default HabitStruggle

const CalendarMonths = ({mt}) => {
    return (
        <Flex mt={mt} direction={'row'} align={'center'} justify={'space-between'}>
            <Flex>
                <Text>
                    Last Month
                </Text>
            </Flex>
        </Flex>
    )
}