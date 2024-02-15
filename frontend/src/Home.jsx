import React, { useState } from 'react'
import WelcomeScreen from '../WelcomeScreen'
import Navbar from './HomeAssets/Navbar'
import { Flex, Text } from '@mantine/core'
import Searchbar from './HomeAssets/Searchbar'
import DateRow from './HomeAssets/DateRow'
import CreateHabitButton from './HomeAssets/CreateHabitButton'
import TodaysHabits from './HomeAssets/TodaysHabits'
import StreakWidget from './HomeAssets/StreakWidget'

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [todaysDate, setTodaysDate] = useState(new Date());
    const [userName, setUserName] = useState('Riya')

    const welcomeTexts = [
        'Good day to work, ',
        'Lets get this bread, ',
        'Time to hustle, ',
        'Keep up the good work, ',
    ]

    const randomWelcomeText = Math.floor(Math.random() * welcomeTexts.length)


  return (
    <Flex w={'100%'} p={20} direction={'column'}>
     <Navbar />
     <Text mt={20} fz={30} fw={600}>
           {welcomeTexts[randomWelcomeText]}{userName}
        </Text>
     <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
     <DateRow 
     todaysDate={todaysDate}
     setTodaysDate={setTodaysDate}
     />
     <StreakWidget />
     <TodaysHabits />
     <CreateHabitButton />
    </Flex>
  )
}

export default Home