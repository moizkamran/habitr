import React, { useEffect, useState } from 'react'
import WelcomeScreen from '../WelcomeScreen'
import Navbar from './HomeAssets/Navbar'
import { Flex, Text } from '@mantine/core'
import Searchbar from './HomeAssets/Searchbar'
import DateRow from './HomeAssets/DateRow'
import CreateHabitButton from './HomeAssets/CreateHabitButton'
import TodaysHabits from './HomeAssets/TodaysHabits'
import StreakWidget from './HomeAssets/StreakWidget'
import axios from 'axios'

const welcomeTexts = [
  'Ready to slay, fam? ',
  'Crush it, squad! ',
  'Vibe and grind, yo! ',
  'Let’s make moves, poppin’! ',
  'Hustle and flow, peeps! ',
  'Flex hustle muscles, alright! ',
  'Level up, homies! ',
  'Hustle harder, aye! ',
  'Trending hustle, legends! ',
  'Iconic today, fam! ',
  'Dreams into reality, good! ',
  'Hustle like streamers, squad! ',
  'Vibe and grind, fam! ',
  'Glow up, peeps! ',
  'Hustle, legends, trending! ',
  'Embrace the chaos, alright. ',
  'Welcome to the circus! ',
  'Existential crisis, again. ',
  'Prisoners of existence, greetings. ',
  'Abyss, shadow puppets? ',
  'Conquer the void, maybe. ',
  'Rollercoaster of despair, fun! ',
  'Existential nightmare, hello. ',
  'Paint it black, salutations. ',
  'Carnival of despair, grab popcorn! ',
  'Dumpster fire survivors, hi. ',
  'Sinking ship passengers, ahoy. ',
  'Dark side, memes, and dread? ',
  'Dance in the darkness, maybe. ',
  'Find humor, absurdity, haha. ',
];

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [habits, setHabits] = useState([]) // [habit1, habit2, habit3, ...
    const [todaysDate, setTodaysDate] = useState(new Date());
    const randomWelcomeText = Math.floor(Math.random() * welcomeTexts.length)

    const getHabits = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/habit')
        setHabits(response.data)
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      getHabits()
    } , [])

  return (
    <Flex w={'100%'} p={20} direction={'column'}>
     <Navbar />
     <Text mt={20} fz={30} fw={600}>
           {welcomeTexts[randomWelcomeText]}
        </Text>
     <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
     <DateRow 
     todaysDate={todaysDate}
     setTodaysDate={setTodaysDate}
     />
     <StreakWidget />
     <TodaysHabits 
     getHabits={getHabits}
     habits={habits} todaysDate={todaysDate}/>
     <CreateHabitButton 
     getHabits={getHabits}
     />
    </Flex>
  )
}

export default Home