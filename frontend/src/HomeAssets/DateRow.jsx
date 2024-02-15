import { Flex, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const DateRow = () => {
  const [todaysDate, setTodaysDate] = useState(new Date());
  const [numDatesToShow, setNumDatesToShow] = useState(calculateNumDatesToShow());

  useEffect(() => {
    function handleResize() {
      setNumDatesToShow(calculateNumDatesToShow());
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDateClick = (clickedDate) => {
    setTodaysDate(clickedDate);
    setNumDatesToShow(calculateNumDatesToShow());
  };

  return (
    <Flex w={'100%'} justify={'space-between'}>
      {[...Array(numDatesToShow)].map((_, index) => {
        const date = new Date();
        date.setDate(todaysDate.getDate() - Math.floor(numDatesToShow / 2) + index);
        const isActive = index === Math.floor(numDatesToShow / 2);
        return (
          <SingleDate
            key={index}
            isActive={isActive}
            date={date}
            onClick={() => handleDateClick(date)}
          />
        );
      })}
    </Flex>
  );
};

const SingleDate = ({ isActive, date, onClick }) => {
  return (
    <Flex
      direction={'column'}
      align={'center'}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <Flex
        w={'50px'}
        h={'50px'}
        bg={isActive ? '#005A99' : 'transparent'}
        style={{ borderRadius: '50%' }}
        align={'center'}
        justify={'center'}
      >
        <Text c={isActive ? 'white' : 'darkgrey'}>{date.getDate()}</Text>
      </Flex>
      <Text c={isActive ? 'black' : 'darkgrey'}>
        {date.toLocaleString('default', { weekday: 'short' }).toLowerCase()}
      </Text>
    </Flex>
  );
};

function calculateNumDatesToShow() {
  // You might adjust this value based on the width of your device
  const deviceWidth = window.innerWidth;
  // Adjust this value as needed for spacing and padding
  const dateItemWidth = 50 + 8; // 50px for the width of each date item, plus some padding
  // Calculate how many dates can fit within the device's width
  return Math.floor(deviceWidth / dateItemWidth);
}

export default DateRow;
