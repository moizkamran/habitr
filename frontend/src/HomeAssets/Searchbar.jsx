import { TextInput } from '@mantine/core'
import React from 'react'

const Searchbar = () => {
  return (
    <TextInput 
    radius={'xl'}
    mt={20}
    variant='filled'
    placeholder="Search for a day, habit or ask a question..." />
  )
}

export default Searchbar