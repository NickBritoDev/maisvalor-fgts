'use client'
import { Box, Button, Divider, Flex, FormControl, FormLabel, Heading, Input, Select, Text, useToast } from '@chakra-ui/react'
import { useState } from 'react';
import React from 'react'
import contact from '@/images/draw/contact.png'
import Image from 'next/image'
import InputMask from 'react-input-mask';
import { SlHome } from "react-icons/sl";
import { FiPhone } from "react-icons/fi";

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
          <Heading mt={4} size={'lg'} color={'#229544'}>Fale conosco</Heading>
          <Text fontSize={18} fontWeight={'bold'}>
            Disponível das 10h às 18h, exceto final de semana e feriados.
            <Divider />
          </Text>
          <Flex alignItems={'center'} justifyContent={'flex-start'} gap={2}>
            <SlHome size={30} />
            <Text>
              Rua Quinze de Novembro nº184,
              13° andar - Centro
              São Paulo / SP
            </Text>
          </Flex>
          <Flex alignItems={'center'} justifyContent={'flex-start'} gap={2}>
            <FiPhone size={30} />
            <Text>
              Sede (11) 3467-0070 /
              Sac 0800-042-0710
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Flex gap={{ md: 0, base: 4 }} flexDir={{ base: 'column', md: 'column' }} h={'95%'} w={{ base: '95%', md: '70%' }} mr={{ base: '0', md: 4 }} mt={{ base: -8, md: 0 }}>
        <Box display={{ base: 'initial', md: 'none' }} mb={2} mt={-6} color={'black'}>
          <Text fontSize={18} fontWeight={'bold'}>
            Disponível das 10h às 18h, exceto final de semana e feriados.
            <Divider />
          </Text>
          <Flex alignItems={'center'} justifyContent={'flex-start'} gap={2}>
            <SlHome size={30} />
            <Text>
              Rua Quinze de Novembro nº184,
              13° andar - Centro
              São Paulo / SP
            </Text>
          </Flex>
          <Flex alignItems={'center'} justifyContent={'flex-start'} gap={2}>
            <FiPhone size={22} />
            <Text>
              Sede (11) 3467-0070 /
              Sac 0800-042-0710
            </Text>
          </Flex>
        </Box>
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
              <InputMask
                mask={formData.telefone.length < 10 ? '(99) 9999-9999' : '(99) 99999-9999'}
                maskChar=""
                value={formData.telefone}
                onChange={e => handleChange({ target: { name: 'telefone', value: e.target.value } })}
              >
                {(inputProps) => (
                  <Input
                    variant='flushed'
                    type="tel"
                    color={'black'}
                    _placeholder={{ color: 'black' }}
                    placeholder="Seu telefone celular"
                    name="telefone"
                    {...inputProps}
                  />
                )}
              </InputMask>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontWeight={'bold'} mb={-2}>Selecione uma profissão</FormLabel>
              <Select variant='flushed' placeholder="Escolha uma profissão" name="produto" value={formData.produto} onChange={handleChange}>
                <option style={{ color: 'black' }} value={'Servidor público'}>Servidor público</option>
                <option style={{ color: 'black' }} value={'Forças Armadas'}>Forças Armadas</option>
                <option style={{ color: 'black' }} value={'Funcionário de empresa privada (CLT)'}>Funcionário de empresa privada (CLT)</option>
                <option style={{ color: 'black' }} value={'Autônomo'}>Autônomo</option>
                <option style={{ color: 'black' }} value={'Aposentado ou pensionista'}>Aposentado ou pensionista</option>
              </Select>
            </FormControl>

            <FormControl mb={4}>
              <FormLabel fontWeight={'bold'} mb={-2}>Selecione uma pergunta</FormLabel>
              <Select variant='flushed' placeholder="Escolha uma dúvida" name="duvida" value={formData.duvida} onChange={handleChange}>
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
