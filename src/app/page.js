'use client'
import React, { useEffect } from 'react';
import {
  Box, Flex, ListItem, UnorderedList, Drawer,
  DrawerBody, DrawerOverlay, DrawerContent, useDisclosure, Button, Text, DrawerHeader, Divider
} from '@chakra-ui/react';
import Image from 'next/image';
import About from './pages/about/page';
import Contact from './pages/contact/page';
import Assessments from './pages/assessments/page';
import Products from './pages/products/page';
import Start from './pages/start/page';
import logo from '@/images/logo.png';
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FcHome, FcLike, FcOnlineSupport, FcPaid, FcRules } from "react-icons/fc";
import InteractionWidget from './components/InteractionWidget';
export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
      });
    }

    onClose();
  };

  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id;
      const listItem = document.querySelector(`[data-section="${sectionId}"]`);

      if (entry.isIntersecting) {
        listItem.style.borderBottom = '2px solid #229544';
      } else {
        listItem.style.borderBottom = 'none';
      }
    });
  };

  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-section');
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Box display={'flex'} pos={'fixed'} mt={2} zIndex={99} left={0} right={0} mx={'auto'} rounded={'2xl'} py={1} px={6} w={'98%'} backgroundColor={'rgba(0, 0, 0, 0.6)'} alignItems={'center'} justifyContent={'space-between'}>

        <InteractionWidget />
        <Box display={{ base: 'flex', md: 'none' }}>
          <Button padding={0} bg={'transparent'} color={'white'} _hover={{ bg: 'transparent', color: '#229544' }} onClick={onOpen}>
            <AiOutlineMenuUnfold fontSize={30} />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>Menu de Navegação</DrawerHeader>
              <Divider mb={10} />
              <DrawerBody display={'flex'} flexDir={'column'} alignItems={'flex-start'} justifyContent={'flex-start'} >
                <UnorderedList
                  ml={-2}
                  listStyleType={'none'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  gap={4}
                  flexDir={'column'}
                  color={'black'}
                >
                  <Button w={'50vw'} alignItems={'center'} justifyContent={'space-between'} onClick={() => scrollToSection('start')}>
                    <ListItem mr={10} data-section="start" cursor={'pointer'} >
                      Início
                    </ListItem>
                    <FcHome />
                  </Button>

                  <Button w={'50vw'} alignItems={'center'} justifyContent={'space-between'} onClick={() => scrollToSection('assessments')}>
                    <ListItem mr={10} data-section="assessments" cursor={'pointer'} >
                      Avaliações
                    </ListItem>
                    <FcLike />
                  </Button>

                  <Button w={'50vw'} alignItems={'center'} justifyContent={'space-between'} onClick={() => scrollToSection('products')}>
                    <ListItem mr={10} data-section="products" cursor={'pointer'} >
                      Produtos
                    </ListItem>
                    <FcPaid />
                  </Button>

                  <Button w={'50vw'} alignItems={'center'} justifyContent={'space-between'} onClick={() => scrollToSection('about')}>
                    <ListItem mr={10} data-section="about" cursor={'pointer'} >
                      Sobre
                    </ListItem>
                    <FcRules />
                  </Button>

                  <Button w={'50vw'} alignItems={'center'} justifyContent={'space-between'} onClick={() => scrollToSection('contact')}>
                    <ListItem data-sec mr={10} tion="contact" cursor={'pointer'} >
                      Fale Conosco
                    </ListItem>
                    <FcOnlineSupport />
                  </Button>

                </UnorderedList>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>

        <UnorderedList
          listStyleType={'none'}
          display={{ base: 'none', md: 'flex' }}
          alignItems={'center'}
          justifyContent={'center'}
          gap={4}
          color={'white'}
        >
          <ListItem data-section="start" cursor={'pointer'} onClick={() => scrollToSection('start')}>
            Início
          </ListItem>
          <ListItem data-section="assessments" cursor={'pointer'} onClick={() => scrollToSection('assessments')}>
            Avaliações
          </ListItem>
          <ListItem data-section="products" cursor={'pointer'} onClick={() => scrollToSection('products')}>
            Produtos
          </ListItem>
          <ListItem data-section="about" cursor={'pointer'} onClick={() => scrollToSection('about')}>
            Sobre
          </ListItem>
          <ListItem data-section="contact" cursor={'pointer'} onClick={() => scrollToSection('contact')}>
            Fale Conosco
          </ListItem>
        </UnorderedList>

        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Image src={logo} alt="Descrição da imagem" width={44} />
          <Text color={'white'} textTransform={'uppercase'} fontWeight={'semibold'} mt={-1}>
            Mais Valor
          </Text>
        </Box>
      </Box>

      <Flex
        h={'100vh'}
        w={'100%'}
        overflowY={'scroll'}
        alignItems={'center'}
        gap={10}
        justifyContent={'flex-start'}
        flexDir={'column'}
        css={`
          ::-webkit-scrollbar {
            width: 0px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #229544;
            border-radius: 6px;
          }

          ::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0);
            border-radius: 6px;
          }
        `}
      >
        <Box bg={'#fff'} zIndex={-1} pos={'absolute'} top={0} w={'100%'} h={'100vh'}>

        </Box>

        <Box id="start" className="scroll-section" h={'100vh'} w={'100%'}>
          <Start />
        </Box>
        <Box id="assessments" className="scroll-section" h={'100vh'} w={'100%'}>
          <Assessments />
        </Box>
        <Box id="products" className="scroll-section" h={'100vh'} w={'100%'}>
          <Products />
        </Box>
        <Box id="about" className="scroll-section" h={'100vh'} w={'100%'}>
          <About />
        </Box>
        <Box id="contact" className="scroll-section" h={'100vh'} w={'100%'}>
          <Contact />
        </Box>
      </Flex>
    </>
  );
}
