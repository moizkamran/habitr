import { ActionIcon, Flex, Text } from '@mantine/core'
import { IconCheck, IconYoga } from '@tabler/icons-react'
import React from 'react'

const TodaysHabits = () => {
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
        <SingleTask />
    </Flex>
  )
}

export default TodaysHabits

const SingleTask = ({ }) => {
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
                <IconYoga size={30} color='white'/>
            </div>
            <Flex direction={'column'} ml={20}>
                <Text fz={20} c={'black'}>
                    Yoga
                </Text>
                <Text fz={15} c={'dimmed'}>
                    30 minutes
                </Text>
            </Flex>
        </Flex>
        <ActionIcon
        size={'xl'}
        variant={'light'}
        color={'grey'}
        radius={'xl'}
        >
            <IconCheck size={20} />
        </ActionIcon>
    </Flex>
  )
}