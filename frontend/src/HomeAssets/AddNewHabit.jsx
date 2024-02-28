import { ActionIcon, Divider, Flex, SegmentedControl, SimpleGrid, Text, Textarea } from '@mantine/core'
import { DateInput } from '@mantine/dates';
import { IconBolt, IconBook, IconBottleFilled, IconBrandPepsi, IconBurger, IconCheck, IconChevronRight, IconCookieMan, IconGuitarPick, IconHeartRateMonitor, IconMoodPlus, IconPhone, IconPlaylistAdd, IconRun, IconScreenShare, IconSmokingNo, IconSocial, IconSparkles, IconX, IconYoga, IconZeppelin } from '@tabler/icons-react'
import React, { useState } from 'react'
import newRequest from '../utils/newRequest';
import axios from 'axios';

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
    // Five additional habits
    {
        icon: <IconBottleFilled size={30} color='black'/>,
        name: 'Drinking Water',
        type: 'start'
    },
    {
        icon: <IconGuitarPick size={30} color='black'/>,
        name: 'Playing Guitar',
        type: 'start'
    },
    {
        icon: <IconBook size={30} color='black'/>,
        name: 'Reading',
        type: 'start'
    },
    {
        icon: <IconZeppelin size={30} color='black'/>,
        name: 'Meditation',
        type: 'start'
    },
    {
        icon: <IconBrandPepsi size={30} color='black'/>,
        name: 'Soda',
        type: 'quit'
    },
    {
        icon: <IconScreenShare size={30} color='black'/>,
        name: 'Watching TV',
        type: 'quit'
    },
    {
        icon: <IconSocial size={30} color='black'/>,
        name: 'Social Media',
        type: 'quit'
    },
    {
        icon: <IconSparkles size={30} color='black'/>,
        name: 'Nail Biting',
        type: 'quit'
    },
];


const AddNewHabit = ({setOpen, getHabits}) => {

    const [selectedType, setSelectedType] = useState(null)
    const [selectedHabit, setSelectedHabit] = useState(null)
    const [selectedFrequency, setSelectedFrequency] = useState(null)
    const [isAddingCustomHabit, setIsAddingCustomHabit] = useState(false)
    const [customHabitName, setCustomHabitName] = useState('')
    const [startDate, setStartDate] = useState(null)
    const today = new Date()
    const [endDate, setEndDate] = useState(null)
    const filteredHabits = predefinedHabits.filter(habit => habit.type === selectedType)

    const timezoneOffsetMs_ST = (startDate?.getTimezoneOffset() || 0) * 60 * 1000; // Get timezone offset in milliseconds
    const localDate_ST = new Date((startDate?.getTime() || 0) - timezoneOffsetMs_ST); // Adjust date to local timezone

    const formattedDate_ST = localDate_ST?.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    
    const timezoneOffsetMs_GT = (endDate?.getTimezoneOffset() || 0) * 60 * 1000; // Get timezone offset in milliseconds
    const localDate_GT = new Date((endDate?.getTime() || 0) - timezoneOffsetMs_GT); // Adjust date to local timezone

    const formattedDate_GT = localDate_GT?.toISOString().split('T')[0]; // Format to YYYY-MM-DD

    const habit = {
        name: customHabitName? customHabitName : selectedHabit?.name,
        description : `I would like to ${selectedType} ${selectedHabit?.name} ${selectedFrequency} from ${startDate?.toLocaleDateString('en-us')} to ${endDate?.toLocaleDateString('en-us')}`,
        frequency: selectedFrequency,
        type: selectedType?.charAt(0).toUpperCase() + selectedType?.slice(1),
        start_date: formattedDate_ST,
        goal_date: formattedDate_GT,
        completed: false,
        streak: 0,
    };

    const handleAddHabit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/create-habit', habit)
            console.log(response.data)
            console.log('Habit added successfully')
            setOpen(false)
            getHabits()
        } catch (error) {
            console.log(error)
        }
    }


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
        <Flex direction={'row'} mt={20} align={'center'} gap={5}>
            <IconChevronRight size={30} color={'black'} />
            <Text fz={23} fw={500}>
                I want to {selectedType}{selectedHabit && !customHabitName ? ` ${selectedHabit?.name?.toLowerCase()}` : ''} {customHabitName && customHabitName} {selectedFrequency ? ` ${selectedFrequency}` : '...'}
            </Text>
        </Flex>
        <SegmentedControl 
        mt={10}
        data={[
            { value: 'start', label: 'Start' },
            { value: 'quit', label: 'Quit' },
        ]}
        size='lg'
        value={selectedType}
        onChange={setSelectedType}
        radius={'xl'}
        />
        {selectedType && (<Text fz={30} fw={600} mt={20}>
            Choose a habit
        </Text>)}
        <SimpleGrid w={'100%'} 
        cols={2}
        >
            {filteredHabits.map((habit, index) => (
                <SingleHabit key={index} icon={habit.icon} 
                habit={habit}
                setSelectedHabit={setSelectedHabit}
                setIsAddingCustomHabit={setIsAddingCustomHabit}
                selectedHabit={selectedHabit}
                name={habit.name} />
            ))}
        </SimpleGrid>

        {selectedType && (<Flex onClick={() => {setIsAddingCustomHabit(!isAddingCustomHabit), setSelectedHabit(null)}}
        mt={30} align={'center'} justify={'center'}>
            <IconMoodPlus size={30} color={'lightgrey'} />
            <Text fz={20} ml={10} c={'dimmed'}>
                Add custom habit
            </Text>
        </Flex>)}

        {isAddingCustomHabit && (<Flex direction={'column'}
        justify={'center'} align={'center'} mt={20}
        onClick={() => setSelectedHabit(habit)}
        style={{
            border: '1px solid #00E2A5',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: '#00E2A5',
            borderRadius: 20,
            padding: 20,
        }}
        >
            <IconBolt size={30} color={'black'} />
            <Textarea 
            placeholder={'Enter habit name'}
            value={customHabitName}
            variant='unstyled'
            ta={'center'}
            onChange={(e) => setCustomHabitName(e.target.value)}
            mt={10}
            />
        </Flex>)}

       {selectedHabit && ( <Text fz={30} fw={600} mt={20}>
            How often do you want to do this?
        </Text>)}
        {selectedHabit && (<SegmentedControl
        mt={10}
        data={[
            { value: 'daily', label: 'Daily' },
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
        ]}

        value={selectedFrequency}
        size='lg'
        onChange={setSelectedFrequency}
        radius={'xl'}
        />)}

    {selectedFrequency && (<Flex direction={'column'} mt={20}>
        <Text fz={30} fw={600} mt={20}>
            Tell us when you want to start and end.
        </Text>
        <Flex mt={10} align={'center'} justify={'center'}>
            <Text fz={20} c={'dimmed'}>
                Start date
            </Text>

            <DateInput 
            value={startDate}
            onChange={setStartDate}
            placeholder={'Select date'}
            radius={'xl'}
            error={startDate && startDate < today ? 'Start date cannot be in the past' : null}
            size='lg'
            style={{marginLeft: 20}}
            />
        </Flex>
        <Flex mt={10} align={'center'} justify={'center'}>
            <Text fz={20} c={'dimmed'}>
                End date
            </Text>

            <DateInput 
            value={endDate}
            onChange={setEndDate}
            placeholder={'Select date'}
            radius={'xl'}
            error={endDate && endDate < startDate ? 'End date cannot be before start date' : null}
            size='lg'
            style={{marginLeft: 20}}
            />
        </Flex>
    </Flex>)}


        {/* Below controllers */}
        <Flex 
        mt={20}
        align={'center'}
        justify={'center'}
        style={{
            //center the button
            gap: 10,
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
            onClick={handleAddHabit}
            radius={'xl'}
            >
                <IconCheck size={20} />
            </ActionIcon>
        
        </Flex>
    </Flex>
  )
}

export default AddNewHabit

const SingleHabit = ({icon, name, setSelectedHabit, habit, selectedHabit, setIsAddingCustomHabit}) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <Flex direction={'column'}
        justify={'center'} align={'center'} mt={20}
        onClick={() => {setSelectedHabit(habit), setIsAddingCustomHabit(false)}}
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