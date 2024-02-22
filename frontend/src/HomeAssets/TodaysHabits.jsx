import { ActionIcon, Flex, Text } from '@mantine/core'
import { IconCheck, IconChessBishop, IconTrash, IconYoga } from '@tabler/icons-react'
import axios from 'axios'
import React from 'react'

const TodaysHabits = ({ todaysDate, habits, getHabits }) => {
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
        {habits.map((habit, index) => {
            return (
                <SingleTask key={index} habit={habit} getHabits={getHabits} />
            )
        })}
    </Flex>
  )
}

export default TodaysHabits

const SingleTask = ({ habit, getHabits}) => {

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
                backgroundColor: 'lightblue',
            }}
            >
                <IconChessBishop size={30} color='white'/>
            </div>
            <Flex direction={'column'} ml={20}>
                <Text fz={20} c={'black'}>
                    {habit.name ? habit.name : 'No name'}
                </Text>
                <Text fz={15} c={'dimmed'}>
                    {habit.frequency ? habit.frequency : 'No frequency'}
                </Text>
            </Flex>
        </Flex>
        <Flex align={'center'} gap={10}>
            <ActionIcon
            size={'xl'}
            variant={'light'}
            color={'red'}
            radius={'xl'}
            onClick={handleDeleteHabit}
            >
                <IconTrash size={20} />
            </ActionIcon>
            <ActionIcon
            size={'xl'}
            variant={'light'}
            color={'grey'}
            radius={'xl'}
            >
                <IconCheck size={20} />
            </ActionIcon>
        </Flex>
    </Flex>
  )
}