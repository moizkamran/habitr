import { Modal } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import React, { useState } from 'react'
import AddNewHabit from './AddNewHabit'

const CreateHabitButton = ({}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [open, setOpen] = useState(false)
  return (
    <>
    <Modal 
    opened={open}
    onClose={() => setOpen(false)}
    radius={'xl'}
    fullScreen
    withCloseButton={false}
    >
       <AddNewHabit setOpen={setOpen}/>
    </Modal>
    <div
    style={{
        position: 'fixed',
        backgroundColor: '#FC9502',
        height: isHovered ? '100px' : '50px',
        width: isHovered ? '100px' : '50px',
        transition: 'all 0.3s',
        borderRadius: '50%',
        bottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //center the plus icon
        transform: 'translateX(-50%)',
        left: '50%',
        cursor: 'pointer'
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    onClick={() => setOpen(true)}
    >
        <IconPlus size={30} color={'white'}/>
    </div>
    </>
  )
}

export default CreateHabitButton