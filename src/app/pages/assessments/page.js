'use client'
import React from 'react'
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import CardsAssessments from './components/CardsAssessments'
import Carousel from './components/Carousel'

export default function Assessments() {
  return (
    <Flex
      bg={'white'}
      h={'100vh'} w={'100%'}
      overflow={'hidden'} alignItems={'center'}
      gap={4} justifyContent={'space-between'}
      flexDir={{ base: 'column', md: 'column' }}
      paddingTop={{ base: 20, md: 24 }}
      paddingBottom={{ base: 20, md: 24 }}
    >
      <Box w={'100%'}>
        <Flex mt={{ base: -20, md: -6 }} mb={{ base: 0, md: 10 }} flexDir={'column'} mx={'auto'} alignItems={'center'} justifyContent={'center'} textAlign={'center'} w={'100%'} >
          <Heading color={'green'} size={{ base: 'lg', md: 'lg' }}>
            Nos conheça através de nossos clientes
            <Divider />
          </Heading>
          <Text mb={4} w={'100%'}>+ 1.2 Milhões clientes satisfeitos, conheça alguns relatos de sucesso </Text>
        </Flex>

        <Flex css={`
          ::-webkit-scrollbar {
            width: 2px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #229544;
            border-radius: 6px;
          }

          ::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0);
            border-radius: 6px;
          }
        `} m={'0 auto'} overflowY={'scroll'} h={{ base: '600px', md: '350px' }} paddingInline={4} alignItems={'center'} justifyContent={'space-between'} w={{ base: '100%', md: '80%' }} gap={4} flexDir={{ base: 'column', md: 'column' }}>
          <Box w={'100%'} rounded={'2xl'} boxShadow={'md'}>
            <CardsAssessments user={'Jordan Esly'} locale={'Santos/SP'} assessments={'Obrigado. A empresa me ajudou muito em uma área que estava meio enrolado que era a área financeira, com a sua ajuda, reformei a minha casa e também comprei um novo veículo. E a autoestima foi lá pra cima.'} />
          </Box>
          <Box w={'100%'} rounded={'2xl'} boxShadow={'md'}>
            <CardsAssessments user={'Adriana Pietrobelli'} locale={"Ponta Grossa/PR"} assessments={'Quero deixar meu relato agradecendo imensamente a consultora que me atendeu pela competência, transparência, agilidade e gentileza, qualidades as quais sempre me atende no que necessito. Muito obrigada.'} />
          </Box>
          <Box w={'100%'} rounded={'2xl'} boxShadow={'md'}>
            <CardsAssessments user={'Leomar Siqueira de Almeida'} locale={"Santos/SP"} assessments={'Minha sincera gratidão, excepcional esforço e dedicação. Sempre busco seus serviços, o atendimento que se equipara ao nível prime/VIP. A qualidade do trabalho é evidente desde o primeiro contato até a pós contratação. O dinheiro já está na conta.'} />
          </Box>

          <Box w={'100%'} rounded={'2xl'} boxShadow={'md'}>
            <CardsAssessments user={'Cristiane Lima Sobreira'} locale={'Santos/SP'} assessments={'Passando para deixar os meus parabéns para o atendimento de vocês, quanta agilidade e compromisso, sem falar no respeito, incrível!'} />
          </Box>
          <Box w={'100%'} rounded={'2xl'} boxShadow={'md'}>
            <CardsAssessments user={'Adriana Pietrobelli'} locale={"Ponta Grossa/PR"} assessments={'Quero deixar meu relato agradecendo imensamente a consultora que me atendeu pela competência, transparência, agilidade e gentileza, qualidades as quais sempre me atende no que necessito. Muito obrigada.'} />
          </Box>
          <Box w={'100%'} rounded={'2xl'} boxShadow={'md'}>
            <CardsAssessments user={'Irismar de Souza'} locale={"Santos/SP"} assessments={'O meu atendimento foi muito bom, o consultor foi muito prestativo e educado. Obrigado.'} />
          </Box>
        </Flex>
      </Box>

      <Box textAlign={'center'}  >
        <Heading color={'green'} mb={{ base: 2, md: 6 }} size={{ base: 'sm', md: 'lg' }}>Empresas Parceiras da Mais Valor</Heading>
        <Carousel />
      </Box>

    </Flex>
  )
}
