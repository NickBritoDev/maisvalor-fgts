'use client'
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import products from '@/images/draw/product.png'
import Image from 'next/image'
import Interaction from './components/Interaction'

export default function Products() {
  return (
    <Flex
      h={'100vh'} w={'100%'}
      overflow={'hidden'} alignItems={'center'}
      gap={10} justifyContent={'flex-start'}
      flexDir={'row'} paddingTop={20} paddingInline={6}>

      <Box w={{ base: '100%', md: '50%' }} h={'95%'}>
        <Interaction />
      </Box>

      <Flex h={'100%'} display={{ base: 'none', md: 'initial' }} mt={24} ml={4} w={'70%'} borderRadius={20} position="relative">
        <div style={{ position: 'relative', zIndex: 0 }}>
          <Image
            src={products}
            alt="Contato"
          />
        </div>
        <Box textAlign={'right'} pos={'absolute'} bottom={'20%'} right={4} zIndex={1} color={'black'}>
          <Heading>Tire Suas Duvidas</Heading>
          <Text fontSize={22} fontWeight={'bold'}>
            Com nosso chat automatico você pode facilitar <br /> o processo de aquisição da sua liberdade financeira.
          </Text>
          <Divider />
        </Box>
      </Flex>

    </Flex>
  )
}
