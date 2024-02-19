'use client'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { BsBinoculars, BsCashCoin, BsGlobe, BsInfoCircle, BsPeople, BsPinMapFill } from "react-icons/bs";

export default function About() {

  return (
    <Box
      bg={'white'}
      h={'100vh'} w={'100%'}
      overflow={'hidden'} alignItems={'center'}
      gap={10} justifyContent={'center'}
      paddingTop={10}
      display={'flex'}
      flexDir={'column'}

    >

      <Heading mb={-8} fontWeight={'normal'} color={'green'} size={'lg'} textTransform={'uppercase'} >Quem é a Mais Valor ?</Heading>
      <Box w={{ base: '90%', md: '60%' }} display={'flex'} flexDir={'column'} alignItems={'center'} textAlign={'center'} justifyContent={'center'}>

        <Flex mt={4} flexDir={{ base: 'column' }} gap={4} w={'100%'} alignItems={'flex-start'} justifyContent={'flex-start'}>
          <Box p={2} rounded={'xl'} pb={6} w={'100%'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'flex-start'}>
            <Flex alignItems={'center'} justifyContent={'space-between'} gap={2}>
              <Text fontWeight={'bold'}>VISÃO</Text>
            </Flex>
            <Text>Queremos ser referência na venda de produtos e serviços financeiros. Com paixão, alta performance e orgulho.</Text>
          </Box>
          <Box p={2} rounded={'xl'} pb={6} w={'100%'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'flex-start'}>
            <Flex alignItems={'center'} justifyContent={'space-between'} gap={2}>
              <Text fontWeight={'bold'}>VALORES</Text>
            </Flex>
            <Text>Transparência, Solidez, Integridade e Confiança, Respeito nas relações, Qualidade nas entregas, Simplicidade, Comprometimento, Proatividade, Capacidade de Realização, Coragem, Ousadia, Comunicação clara e precisa, Sentimento de Pertencimento, Ética e Credibilidade, Dor de dono.</Text>
          </Box>
          <Box p={2} rounded={'xl'} pb={6} w={'100%'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'flex-start'}>
            <Flex alignItems={'center'} justifyContent={'space-between'} gap={2}>
              <Text fontWeight={'bold'}>MISSÃO</Text>
            </Flex>
            <Text>Sermos os melhores no que fazemos, inovando e melhorando continuamente.</Text>
          </Box>
        </Flex>

        <Flex flexDir={{ base: 'row', md: 'row' }} mt={{ base: 20, md: 10 }} gap={4} w={'100%'} alignItems={'flex-start'} justifyContent={'flex-start'}>
          <Box w={'100%'} boxShadow={'md'} p={2} rounded={'xl'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'flex-start'}>
            <BsPinMapFill size={30} color='green' />
            <Text>12 escritórios <br></br>
              + Matriz (SP)</Text>
          </Box>
          <Box w={'100%'} boxShadow={'md'} p={2} rounded={'xl'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'flex-start'}>
            <BsCashCoin size={30} color='green' />
            <Text>+ 1.2 Milhões <br></br>
              de clientes</Text>
          </Box>
          <Box w={'100%'} boxShadow={'md'} p={2} rounded={'xl'} display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'flex-start'}>
            <BsPeople size={30} color='green' />
            <Text>10 soluções <br></br>
              de crédito</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
