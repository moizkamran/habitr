import { ActionIcon, Divider, Flex, SegmentedControl, Text } from '@mantine/core'
import { IconBurger, IconCheck, IconRun, IconSmokingNo, IconX, IconYoga } from '@tabler/icons-react'
import React, { useState } from 'react'

const predefinedHabits = [
    {
        icon: <IconYoga size={30} color='black'/>,
        name: 'Yoga',
        type: 'start'
    },
    {
        icon: <IconRun size={30} color='black'/>,
        name: 'Running',
        type: 'start'
    },
    {
        icon: <IconSmokingNo size={30} color='black'/>,
        name: 'Smoking',
        type: 'quit'
    },
    {
        icon: <IconBurger size={30} color='black'/>,
        name: 'Junk Food',
        type: 'quit'
    },

]

const AddNewHabit = ({setOpen}) => {

    const [selectedType, setSelectedType] = useState(null)
    const [selectedHabit, setSelectedHabit] = useState(null)

    const filteredHabits = predefinedHabits.filter(habit => habit.type === selectedType)

  return (
    <Flex w={'100%'} h={'100%'}
    p={40} direction={'column'}>
        <Text fz={30} fw={600}>
            Add a new habit
        </Text>
        <Text c={'dimmed'} mt={5}>
            You can add a new habit to track here
        </Text>
        <Divider mt={20} />
        <Text fz={30} fw={600} mt={20}>
            I want to {selectedType}{selectedHabit ? ` ${selectedHabit.name.toLowerCase()}` : ''}
        </Text>
        <SegmentedControl 
        mt={10}
        data={[
            { value: 'quit', label: 'Quit' },
            { value: 'start', label: 'Start' },
        ]}
        value={selectedType}
        onChange={setSelectedType}
        radius={'xl'}
        />
        <Text fz={30} fw={600} mt={20}>
            Choose a habit

        </Text>
        <Flex w={'100%'} justify={'space-between'} mt={10} direction={'column'}>
            {filteredHabits.map((habit, index) => (
                <SingleHabit key={index} icon={habit.icon} 
                habit={habit}
                setSelectedHabit={setSelectedHabit}
                selectedHabit={selectedHabit}
                name={habit.name} />
            ))}
        </Flex>
        <Flex style={{
            position: 'absolute',
            bottom: 20,
            //center the button
            gap: 10,
            left: '50%',
            transform: 'translateX(-50%)',
        }}>
            <ActionIcon
            size={'xl'}
            variant={'light'}
            color={'red'}
            onClick={() => setOpen(false)}
            radius={'xl'}
            >
                <IconX size={20} />
            </ActionIcon>
            <ActionIcon
            size={'xl'}
            variant={'light'}
            color={'green'}
            radius={'xl'}
            >
                <IconCheck size={20} />
            </ActionIcon>
        
        </Flex>
    </Flex>
  )
}

export default AddNewHabit

const SingleHabit = ({icon, name, setSelectedHabit, habit, selectedHabit}) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <Flex direction={'column'}
        justify={'center'} align={'center'} mt={20}
        onClick={() => setSelectedHabit(habit)}
        style={{
            border: isHovered ? '1px solid #00E2A5' : '1px solid lightgrey',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: selectedHabit?.name === name ? '#00E2A5' : 'white',
            borderRadius: 20,
            padding: 20,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >
            {icon}
            <Text fz={20} mt={10}>
                {name}
            </Text>
        </Flex>
    )
    }