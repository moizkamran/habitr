import React, { useState } from 'react'
import WelcomeScreen from '../WelcomeScreen'
import Navbar from './HomeAssets/Navbar'
import { Flex } from '@mantine/core'
import Searchbar from './HomeAssets/Searchbar'
import DateRow from './HomeAssets/DateRow'

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [todaysDate, setTodaysDate] = useState(new Date());

  return (
    <Flex w={'100%'} p={20} direction={'column'}>
     <Navbar />
     <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
     <DateRow 
     todaysDate={todaysDate}
     setTodaysDate={setTodaysDate}
     />
    </Flex>
  )
}

export default Home