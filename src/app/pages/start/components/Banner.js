'use client'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, FormControl, FormLabel, Heading, Input, Select, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import Image from 'next/image'
import Details from './Details';
import InputMask from 'react-input-mask';

export function Banner({ img, title, sub1, sub2, func, prod }) {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    produto: prod,
    duvida: '',
    origem: 'BANNER'
  })
  const phoneNumber = '+5511913675219';
  const message = `Olá, meu nome é ${formData.nome}, sou ${formData.produto}. Tenho interesse em sacar meu ${prod}`;

  const sendMessage = async (e) => {
    e.preventDefault();
    onClose()
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
          produto: prod,
          duvida: '',
          origem: 'BANNER'
        });

        toast({
          title: 'ENVIANDO...',
          description: '',
          status: 'loading',
          duration: 9000,
          isClosable: true,
        });
        setTimeout(() => {
          window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`);
        }, 3000);
      } else {
        toast({
          title: 'ERRO AO ENVIAR.',
          description: 'Tente novamente',
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
    <>
      <Box zIndex={9} w={'100%'} textAlign={'left'} p={{ base: 4, md: 20 }} h={'100%'} position="relative" left={{ base: '2%', md: '1%' }} top={{ base: '15%', md: '15%' }}>
        <Heading textTransform={'uppercase'} size={{ base: 'xl', md: 'lg' }}>{title}</Heading>
        <Text zIndex={7} fontSize={20} fontWeight={'bold'} my={4}>{sub1}</Text>
        <Text zIndex={7} fontSize={20} fontWeight={'bold'}>{sub2}</Text>
        <Flex flexDir={{ base: 'column', md: 'row' }} textTransform={'uppercase'}>
          <Button w={{ base: '50%', md: '10%' }} zIndex={9} mt={{base: 10, md: 20 }} onClick={onOpen}>
            Contrate já!
          </Button>
          <Details />
        </Flex>
      </Box>


      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Formulário de Dúvidas sobre: {prod}
            </AlertDialogHeader>

            <AlertDialogBody>
              <form onSubmit={sendMessage}>
                <FormControl mb={4}>
                  <FormLabel fontWeight={'bold'} mb={-2}>Nome</FormLabel>
                  <Input required variant='flushed' type="text" color={'black'} _placeholder={{ color: 'black' }} placeholder="Seu nome completo" name="nome" value={formData.nome} onChange={handleChange} />
                </FormControl>

                <FormControl mb={4}>
                  <FormLabel fontWeight={'bold'} mb={-2}>Email</FormLabel>
                  <Input required variant='flushed' type="email" color={'black'} _placeholder={{ color: 'black' }} placeholder="Seu email" name="email" value={formData.email} onChange={handleChange} />
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

                {/* <FormControl mb={4}>
                  <FormLabel fontWeight={'bold'} mb={-2}>Selecione uma pergunta</FormLabel>
                  <Select variant='flushed' placeholder="Escolha uma dúvida" name="duvida" value={formData.duvida} onChange={handleChange}>
                    <option style={{ color: 'black' }} value={'Como funciona?'}>Como funciona?</option>
                    <option style={{ color: 'black' }} value={'É seguro?'}>É seguro?</option>
                    <option style={{ color: 'black' }} value={'Tenho direito ao FGTS?'}>Tenho direito ao FGTS?</option>
                    <option style={{ color: 'black' }} value={'É possivel fazer com nome sujo?'}>É possivel fazer com nome sujo?</option>
                    <option style={{ color: 'black' }} value={'Qual o percentual de juros?'}>Qual o percentual de juros?</option>
                    <option style={{ color: 'black' }} value={'Consigo adquirir esse produto?'}>Consigo adquirir esse produto?</option>
                  </Select>
                </FormControl> */}

                <Button w={'100%'} type="submit" colorScheme="whatsapp" mt={4}>
                  Enviar
                </Button>
              </form>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
