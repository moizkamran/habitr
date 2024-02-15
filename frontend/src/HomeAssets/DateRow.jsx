import { Flex, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const DateRow = ({ todaysDate, setTodaysDate }) => {
  const [numDatesToShow, setNumDatesToShow] = useState(calculateNumDatesToShow());
  const [currentMonth, setCurrentMonth] = useState(todaysDate.getMonth());
  const [currentYear, setCurrentYear] = useState(todaysDate.getFullYear());

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

  useEffect(() => {
    // Update currentMonth and currentYear based on todaysDate
    setCurrentMonth(todaysDate.getMonth());
    setCurrentYear(todaysDate.getFullYear());
  }, [todaysDate]);

  return (
    <Flex direction={'column'} align={'center'} mt={10}>
      <Flex w={'100%'} justify={'space-between'}>
        {[...Array(numDatesToShow)].map((_, index) => {
          const date = new Date(currentYear, currentMonth, todaysDate.getDate() - Math.floor(numDatesToShow / 2) + index);
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
      <Text mt={10} c={'darkgrey'}>
        {todaysDate.toLocaleString('default', { month: 'long' })}{' '}
        {todaysDate.getFullYear()}
      </Text>
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
