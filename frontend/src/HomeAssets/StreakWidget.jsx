import { Flex, Text } from '@mantine/core'
import React from 'react'

const StreakWidget = () => {
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
            <Text fz={20} c={'black'}>
                You are on a streak!
            </Text>
            <Text fz={15} c={'dimmed'}>
                5 days
            </Text>
        </Flex>
    </Flex>
  )
}

export default StreakWidget