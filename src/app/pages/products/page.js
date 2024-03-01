'use client'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Flex, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function Products() {
  const script = [
    {
      prg: 'O que é a Antecipação Saque Aniversário FGTS?',
      rsp: 'Essa modalidade de crédito permite a antecipação do valor de até 10 anos de Saque Aniversário do FGTS. Para ter direito ao Saque Aniversário, é necessário que a pessoa faça a opção pela modalidade Saque Aniversário através do App FGTS.',
    },
    {
      prg: 'Quem pode contratar a Antecipação do Saque Aniversário?',
      rsp: 'Todo cliente com conta vinculada de FGTS, ativa ou inativa, que tenha aderido à modalidade Saque Aniversário',
    },
    {
      prg: 'A antecipação do Saque FGTS compromete minhas linhas de crédito?',
      rsp: 'Não, pois na Antecipação de Saque Aniversário, o cliente quita o empréstimo em uma única parcela utilizando o valor que tem direito ao Saque Aniversário, sem comprometer a sua renda mensal.',
    },
    {
      prg: 'Vou passar por análise de crédito?',
      rsp: 'Não. A operação dispensa análise de crédito.',
    },
    {
      prg: 'Existe valor mínimo de contratação?',
      rsp: 'Sim, o valor mínimo é de R$100,00 reais.',
    },
    {
      prg: 'Em quanto tempo o valor da antecipação de saque FGTS cai na minha conta?',
      rsp: 'Em até 24 horas após a aprovação da operação.',
    },
  ]

  return (
    <Flex
      h={'100vh'} w={'100%'}
      overflow={'hidden'} alignItems={'center'}
      gap={10} justifyContent={'flex-start'}
      flexDir={'column'} paddingTop={0} paddingInline={6}>

      <Heading color={'green'} size={{ base: 'lg', md: 'lg' }}>Dúvidas frequentes</Heading>

      <Accordion w={'100%'} gap={8} allowToggle>
        {script.map((item, index) => (
          <AccordionItem mb={8} key={index}>
            <h2>
              <AccordionButton>
                <Box fontWeight={'bold'} as="span" flex='1' textAlign='left'>
                  {item.prg}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {item.rsp}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Flex>
  )
}
