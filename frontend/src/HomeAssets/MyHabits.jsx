import { Badge, Button, Flex, SimpleGrid, Text } from '@mantine/core'
import { IconChess } from '@tabler/icons-react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'

const MyHabits = ({setMyHabits}) => {
    const [habits, setHabits] = useState([])
    const getHabits = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/habit')
          setHabits(response.data)
        } catch (error) {
          console.log(error)
          setError(error)
        }
      }
  
      useEffect(() => {
        getHabits()
      } , [])

  return (
    <Flex direction={'column'} pos={'relative'}>
        <Navbar type={'close'} typeClose={setMyHabits}/>
    <SimpleGrid mt={20} cols={2}>
        {habits.map((habit, index) => (
            <SingleHabit key={index} habit={habit} getHabits={getHabits} />
        ))}
    </SimpleGrid>
    </Flex>
  )
}

export default MyHabits

const SingleHabit = ({habit, getHabits}) => {

    const handleDeleteHabit = async () => {
        try {
            const confrim = window.confirm('Are you sure you want to delete this habit?')
            if (!confrim) return
            const response = await axios.delete(`http://localhost:8000/api/delete-habit/${habit.id}`)
            getHabits()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Flex direction={'column'} align={'center'} justify={'center'} p={10}
        style={{
            borderRadius: 20,
            border: '1px solid lightgrey',
        }}
         m={10} radius={10}>
            <Flex align={'center'} justify={'center'}
            direction={'column'}
             style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: '#FFEBD8',
            }}>
            <IconChess size={40} color={'#F9820B'} />
            </Flex>
            <Text fz={'lg'} ta={'center'} mt={10}>
                {habit.name}
            </Text>
            <Flex gap={5}>
            <Badge mt={10} size="lg" color={'gray'} variant='light'>
                {habit.frequency}
            </Badge>
            <Badge mt={10} size="lg" color={habit.completed ? 'green' : 'red'} variant='light'>
                {habit.completed ? 'Completed' : 'Not completed'}
            </Badge>
            </Flex>
            <Flex gap={5}>
            <Badge mt={10} size="lg" color={'green'} variant='dot'>
                {habit.start_date}
            </Badge>
            <Badge mt={10} size="lg" color={'red'} variant='dot'>
                {habit.goal_date}
            </Badge>
            </Flex>
            <Button mt={10} 
            size='md'
            onClick={handleDeleteHabit}
            style={{
                width: '100%',
                borderRadius: 20,
                border: 'none'
            }}
            bg={'#F9820B'}>
                Delete
            </Button>
        </Flex>

    )
}