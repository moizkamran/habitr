import React from 'react'
import { Flex, Text } from '@mantine/core'

const WelcomeScreen = () => {
  return (
    <Flex h={'100%'} w={'100%'}>
        <Text c={'white'}>Track your habits.</Text>
        <div className='1-white-dot'/>
    </Flex>
  )
}

export default WelcomeScreen