import { Flex, Text } from '@mantine/core'
import { IconHourglassLow } from '@tabler/icons-react';
import React from 'react'

const StreakWidget = () => {
    const timeLeftUntilMidnight = () => {
        const now = new Date();
        const midnight = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0, 0, 0
        )
        return midnight - now;
    }
    const timeLeft = timeLeftUntilMidnight();
    const timeLeftInMinutes = Math.floor(timeLeft / 60000);
    const timeLeftInHours = Math.floor(timeLeftInMinutes / 60);
  return (
    <Flex mt={20} align={'center'} justify={'space-between'} p={5}
    style={{
        borderRadius: 20,
        border: '2px solid #F9820B',
    
    }}
    >
        <iframe style={{
            width: 100,
            height: 100,
            borderRadius: 20,
            border: 'none',
            position: 'relative',
        }}
        src="https://lottie.host/embed/f65648dd-9347-4c44-b82a-083d0c00bbc0/lpr5WztKAI.json" />
        <Flex direction={'column'}
        style={{
            position: 'absolute',
            left: 150,

        }}
        >
            <Text fz={20} c={'black'} >
                You are on a streak!
            </Text>
            <Flex align={'center'} mt={5} gap={10}>
                <Text fz={15} c={'dimmed'}>
                    5 days
                </Text>
                <Flex align={'center'} gap={5} bg={'#F9820B'} p={5} style={{
                    borderRadius: 10,
                }}>
                <IconHourglassLow size={20} color={'white'} />
                <Text fz={15} c={'white'}>
                {timeLeftInHours} hours left
                </Text>
                </Flex>
            </Flex>
        </Flex>
    </Flex>
  )
}

export default StreakWidget