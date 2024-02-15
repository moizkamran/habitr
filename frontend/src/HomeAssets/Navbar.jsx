import { ActionIcon, Flex, Image } from '@mantine/core'
import { IconMenu, IconUser } from '@tabler/icons-react'
import fullLogo from '../assets/fullLogo.svg'
import smallLogo from '../assets/smallLogo.svg'
import React from 'react'

const Navbar = () => {
  return (
    <Flex miw={"100%"} align={'center'} justify={'space-between'}>
        <ActionIcon
            padding={10}
            size={30}
            radius={'50%'}
            variant={'light'}
            color={'gray'}
            style={{ cursor: 'pointer' }}
        >
            <IconMenu size={20} />
        </ActionIcon>
        <Image src={fullLogo} height={25} width={150} />
        <ActionIcon
            padding={10}
            size={30}
            radius={'50%'}
            variant={'light'}
            color={'gray'}
            style={{ cursor: 'pointer' }}
        >
            <IconUser size={20} />
        </ActionIcon>
    </Flex>
  )
}

export default Navbar