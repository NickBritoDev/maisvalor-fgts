'use client'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Flex, FormControl, FormLabel, Heading, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import Image from 'next/image'

export function Banner({ img, title, sub1, sub2, func, prod }) {
  const phoneNumber = '+5511965927889';
  const message = `Olá vi o anucio sobre ${prod} na pagina de vocês e gostaria de saber mais sobre o produto, metodos de contratação e segurança.`
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    produto: prod,
    duvida: message,
    origem: 'BANNER'
  })

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
          duvida: message,
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
        <Flex flexDir={{ base: 'column', md: 'row' }}>
          <Button w={{ base: '50%', md: '10%' }} zIndex={9} textTransform={'uppercase'} mt={20} onClick={onOpen}>
            Contrate já !
          </Button>
          <Button display={'none'} w={{ base: '50%', md: '10%' }} zIndex={9} ml={{ base: 0, md: 2 }} mt={{ base: 2, md: 8 }} onClick={func}>Mais Produtos</Button>
        </Flex>
      </Box>

      <Box zIndex={0} position="relative"
        left={prod === 'CREFAZ' ?
          { base: '-15%', md: '50%' }
          :
          { base: '-2%', md: '50%' }
        }
        bottom={prod === 'CREFAZ' ?
          { base: '51.5%', md: '96.5%' }
          :
          { base: '39%', md: '75%' }
        }
        w={prod === 'CREFAZ' ?
          { base: '554px', md: '900px' }
          :
          { base: '420px', md: '700px' }
        }>
        <Image src={img} alt='fgts mais valor' />
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Formulario de Duvidas sobre: {prod}
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
                  <Input required variant='flushed' type="tel" color={'black'} _placeholder={{ color: 'black' }} placeholder="Seu telefone celular" name="telefone" value={formData.telefone} onChange={handleChange} />
                </FormControl>

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
