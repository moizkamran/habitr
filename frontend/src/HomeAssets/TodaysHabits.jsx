import { ActionIcon, Flex, Text } from '@mantine/core'
import { IconCheck, IconChessBishop, IconCircle, IconCircleFilled, IconTrash, IconYoga } from '@tabler/icons-react'
import axios from 'axios'
import React from 'react'

const bg_colors = ["#ef476f", "#ffd166", "#06d6a0", "#118ab2", "#118ab2"]

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

const SingleTask = ({ habit, getHabits }) => {

    const random_bg = Math.floor(Math.random() * bg_colors.length)

    const goal_date = new Date(habit.goal_date)
    const goal_days_left = Math.floor((goal_date - new Date()) / (1000 * 60 * 60 * 24))
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
                    {habit.streak > 0 && (<>
                    <IconCircleFilled size={5} color={'black'} />
                    <Text fz={15} c={'dimmed'}>
                    🔥 {habit?.streak} Streak
                    </Text>
                    </>)}
                </Flex>
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