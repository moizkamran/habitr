import { IconPlus } from '@tabler/icons-react'
import React, { useState } from 'react'

const CreateHabitButton = ({}) => {
    const [isHovered, setIsHovered] = useState(false)
  return (
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
    >
        <IconPlus size={30} color={'white'}/>
    </div>
  )
}

export default CreateHabitButton