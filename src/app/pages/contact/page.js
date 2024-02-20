'use client'
import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Select, Text, useToast } from '@chakra-ui/react'
import { useState } from 'react';
import React from 'react'
import contact from '@/images/draw/contact.png'
import Image from 'next/image'

export default function Contact() {
  const toast = useToast();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    produto: '',
    duvida: '',
    origem: 'CONTATO'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key]) {
        toast({
          title: 'Campos obrigatórios não preenchidos',
          description: `O campo ${key} é obrigatório.`,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      }
    }

    try {
      const response = await fetch('/api/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          produto: '',
          duvida: '',
          origem: 'CONTATO'
        });

        toast({
          title: 'ENVIADO.',
          description: 'Inserção de formulário realizada com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'ERRO AO ENVIAR.',
          description: 'Inserção de formulário não pode ser realizada!',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Erro ao realizar a solicitação:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Flex
      h={'100vh'} w={'100%'}
      overflow={'hidden'} alignItems={'center'}
      gap={10} justifyContent={'flex-start'}
      flexDir={{ base: 'column', md: 'row' }}
      paddingTop={20}
    >
      <Flex h={'100%'} display={{ base: 'none', md: 'initial' }} mt={40} ml={4} w={'70%'} borderRadius={20} position="relative">
        <div style={{ position: 'relative', zIndex: 0 }}>
          <Image
            src={contact}
            alt="Contato"
          />
        </div>
        <Box pos={'absolute'} bottom={'30%'} left={4} zIndex={3} color={'black'}>
          <Heading size={'lg'} color={'#229544'}>Fale Conosco</Heading>
          <Text fontSize={18} fontWeight={'bold'}>
            Estamos aqui para ajudar! Entre em contato <br /> e descubra como podemos tornar sua experiência ainda melhor.
            <Divider />
          </Text>
        </Box>
      </Flex>

      <Flex gap={{ md: 0, base: 4 }} flexDir={{ base: 'column', md: 'column' }} h={'95%'} w={{ base: '95%', md: '70%' }} mr={{ base: '0', md: 4 }} >
        <Box boxShadow={'md'} rounded={{ base: '2xl', md: 'none' }} w={{ base: '100%', md: '100%' }} bg={'white'} color={'black'} p={4}  >
          <Heading size={'sm'}>Preencha o formulário.</Heading>
          <Text>Ao preencher os seus dados você nos ajuda a te auxiliar na melhor decisão</Text>
          <Divider mb={6} />
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel fontWeight={'bold'} mb={-2}>Nome</FormLabel>
              <Input variant='flushed' type="text" color={'black'} _placeholder={{ color: 'black' }} placeholder="Seu nome completo" name="nome" value={formData.nome} onChange={handleChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontWeight={'bold'} mb={-2}>Email</FormLabel>
              <Input variant='flushed' type="email" color={'black'} _placeholder={{ color: 'black' }} placeholder="Seu email" name="email" value={formData.email} onChange={handleChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontWeight={'bold'} mb={-2}>Telefone</FormLabel>
              <Input variant='flushed' type="tel" color={'black'} _placeholder={{ color: 'black' }} placeholder="Seu telefone celular" name="telefone" value={formData.telefone} onChange={handleChange} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontWeight={'bold'} mb={-2}>Selecione um produto</FormLabel>
              <Select variant='flushed' placeholder="Escolha um produto" name="produto" value={formData.produto} onChange={handleChange}>
                <option style={{ color: 'black' }} value={'FGTS'}>FGTS</option>
                <option style={{ color: 'black' }} value={'Outros Produtos'}>Outros Produtos</option>
                {/* <option style={{ color: 'black' }} value={'CREFAZ'}>CREFAZ</option>
                <option style={{ color: 'black' }} value={'Crédito Consignado'}>Crédito Consignado</option>
                <option style={{ color: 'black' }} value={'Cartão Beneficio'}>Cartão Beneficio</option>
                <option style={{ color: 'black' }} value={'Credito Imobiliário (CGI e Aquisição)'}>Credito Imobiliário (CGI e Aquisição)</option>
                <option style={{ color: 'black' }} value={'Crédito Pessoal'}>Crédito Pessoal</option>
                <option style={{ color: 'black' }} value={'Consórcio'}>Consórcio</option>
                <option style={{ color: 'black' }} value={'Energia Solar'}>Energia Solar</option> */}
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontWeight={'bold'} mb={-2}>Selecione uma pergunta</FormLabel>
              <Select variant='flushed' placeholder="Qual sua dúvida?" name="duvida" value={formData.duvida} onChange={handleChange}>
                <option style={{ color: 'black' }} value={'Como funciona?'}>Como funciona?</option>
                <option style={{ color: 'black' }} value={'É seguro?'}>É seguro?</option>
                <option style={{ color: 'black' }} value={'Tenho direito ao FGTS?'}>Tenho direito ao FGTS?</option>
                <option style={{ color: 'black' }} value={'É possivel fazer com nome sujo?'}>É possivel fazer com nome sujo?</option>
                <option style={{ color: 'black' }} value={'Qual o percentual de juros?'}>Qual o percentual de juros?</option>
                <option style={{ color: 'black' }} value={'Consigo adquirir esse produto?'}>Consigo adquirir esse produto?</option>
              </Select>
            </FormControl>

            <Button w={'100%'} type="submit" colorScheme="whatsapp" mt={4}>
              Enviar
            </Button>
          </form>
        </Box>

        <Box display={{ base: 'initial', md: 'initial' }} h={{ base: '100%' }} w={{ base: '100%', md: '100%' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.588561940494!2d-46.6340449!3d-23.547296199999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5855260fd72d%3A0xc9fe9caf4e1e6f85!2sRua%20XV%20de%20Novembro%2C%20184!5e0!3m2!1spt-BR!2sbr!4v1707310542577!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Flex>
    </Flex>
  );
}
