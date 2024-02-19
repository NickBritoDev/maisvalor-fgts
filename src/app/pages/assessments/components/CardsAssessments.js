'use client'
import { Divider, Flex, Text, } from '@chakra-ui/react'
import { FaStar } from "react-icons/fa";
import { RiMapPinUserFill } from "react-icons/ri";
import React from 'react'

export default function CardsAssessments({ user, assessments, locale }) {
  return (
    <Flex flexDir={'column'} align={'center'} p={2}>
      <Flex alignItems={'center'} justifyContent={'space-between'} w={'100%'}>

        <Flex color={'orange'}>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </Flex>

        <Flex fontWeight={'bold'} textAlign={'right'} flexDir={'column'}>
          <Text fontSize={16}>{user}</Text>
          <Flex alignItems={'center'} justifyContent={'flex-end'}>
            <Text fontSize={14} color={'gray.600'} mb={-0.5}>{locale}</Text>
            <RiMapPinUserFill color='green' />
          </Flex>
        </Flex>
      </Flex>

      <Divider />

      <Text textAlign={'center'}>{assessments}</Text>


    </Flex>
  )
}
