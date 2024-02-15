import { Flex, Text } from '@mantine/core'
import React from 'react'

const WelcomeScreen = () => {
  return (
    <Flex w={'100%'} h={'100%'}
    p={40}
     align={'center'} justify={'center'}>
        <Text fz={30} fw={600}>
            Track your habits
        </Text>
        <div className='circle-1-a'/>
        <div className='circle-1'/>
    </Flex>
  )
}

export default WelcomeScreen