import { Flex, Kbd, Modal, Text, TextInput, rem } from '@mantine/core'
import { Spotlight, spotlight } from '@mantine/spotlight';
import { IconBrain, IconDashboard, IconFileText, IconHome, IconLifebuoy, IconQuestionMark, IconSearch } from '@tabler/icons-react'
import React, { useState } from 'react'
import HabitStruggle from './HabitStruggle';
import MyHabits from './MyHabits';


const Searchbar = () => {
  const [HabitStruggleOpen, setHabitStruggleOpen] = useState(false)
  const [myHabits, setMyHabits] = useState(false)

const actions = [
  {
    id: 'home',
    label: 'Home',
    description: 'Get to home page',
    onClick: () => console.log('Home'),
    leftSection: <IconHome style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
  {
    id: 'documentation',
    label: 'Documentation',
    description: 'Visit documentation to lean more about all features',
    onClick: () => window.open('https://d93iqs7wi77qf.cloudfront.net/0/8/C/08C47BD11ECB6BED05C4FA207F2E994F367F951D6E6B589D2B6E493F2DAA6059?response-content-disposition=inline%3b+filename*%3dutf-8%27%27habitr.pdf&response-content-type=application%2fpdf&Expires=1709263105&Signature=NUis4f4QRSESbUl6dAfQw8NLI6OB8~INsKqBohxXsQiaPREd5kVSVQmalXOK8OA3dFqaZJPcDUPrJ1RtwtR57kDGcErhFolaelXaUxm933fhKgXQTzYgCfjzFzMSLVMaajZOfrwwqqUieDr7x044nRF~WIjZITP4idFnPYCa8zk_&Key-Pair-Id=APKAJJI6DBUOTOT5FBTQ', '_blank'),
    leftSection: <IconFileText style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
  {
    id: 'my-habits',
    label: 'My Habits',
    description: 'View your habits',
    onClick: () => setMyHabits(true),
    leftSection: <IconDashboard style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
  {
    id: 'habit-analysis',
    label: 'Habit analysis',
    description: 'Get an overview of your progress',
    onClick: () => setHabitStruggleOpen(true),
    leftSection: <IconBrain style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
  {
    id: 'habit-struggle',
    label: 'What habit did I struggle with?',
    description: 'Find out what habit you struggled with the most',
    onClick: () => setHabitStruggleOpen(true),
    leftSection: <IconQuestionMark style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
  {
    id: 'habit-tips',
    label: 'Habit tips',
    description: 'Get tips on how to improve your habits',
    onClick: () => window.open('https://jamesclear.com/habit-guide', '_blank'),
    leftSection: <IconQuestionMark style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
  {
    id: 'contact',
    label: 'Get help',
    description: 'Get help from the developer',
    onClick: () => window.open('mailto:abdul.moeez@iu-study.org', '_blank'),
    leftSection: <IconLifebuoy style={{ width: rem(24), height: rem(24) }} stroke={1.5} />,
  },
];


  return (
    <>
    <Modal 
    fullScreen
    transitionProps={{
      transition: 'slide-up'
    }}
    withCloseButton={false}
    opened={HabitStruggleOpen}
    onClose={() => setHabitStruggleOpen(false)}
    >
      <HabitStruggle setHabitStruggleOpen={setHabitStruggleOpen}/>
    </Modal>
    <Modal 
    fullScreen
    transitionProps={{
      transition: 'slide-up'
    }}
    withCloseButton={false}
    opened={myHabits}
    onClose={() => setMyHabits(false)}
    >
      <MyHabits setMyHabits={setMyHabits}/>
    </Modal>
    <Flex onClick={spotlight.open}
    align={'center'} justify={'space-between'} style={{
      padding: 10,
      borderRadius: 20,
      border: '2px solid lightgrey',
    }}
    mt={20}>
      <Flex align={'center'} gap={5}>
        <IconSearch size={30} color={'#F9820B'} />
        <Text c={'dimmed'} fz={16}>
          Search for habits, ask for help, or get tips!
        </Text>
      </Flex>
      <div dir="ltr">
      <Kbd>⌘</Kbd> + <Kbd>K</Kbd>
      </div>
      </Flex>
      <Spotlight
      actions={actions}
      nothingFound="Nothing found..."
      radius={20}
      highlightQuery
      searchProps={{
        leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
        placeholder: 'Search...',
      }}
    />
    </>
  )
}

export default Searchbar