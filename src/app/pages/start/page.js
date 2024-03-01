'use client'
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Banner } from './components/Banner'
import { FaArrowDown } from 'react-icons/fa'
import fgts from '@/images/produtos/fgts.png'
import Image from 'next/image'

export default function Start() {
  const details = [
    {
      prod: 'FGTS',
      img: fgts,
      title: 'Antecipe até 10 parcelas do seu saque FGTS',
      sub1: 'Com a antecipação você garante até 10 parcelas do seu saldo FGTS com a menor taxa do mercado.',
      sub2: 'Dinheiro rápido na conta, sem burocracia e também disponível para negativados.',
      gradient: [
        '#4b6cb7',
        '-webkit-linear-gradient(to right, #4b6cb7, #182848)',
        'linear-gradient(to right, #4b6cb7, #182848)',
      ],
    },
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNextBanner = () => {
    setCurrentBanner((prevBanner) => (prevBanner + 1) % details.length);
  };

  useEffect(() => {
    const intervalId = setInterval(handleNextBanner, 9000);

    return () => clearInterval(intervalId);
  }, [handleNextBanner]);


  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
      });
    }

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
    <Flex
      color={'white'}
      h={'100vh'}
      w={'100%'}
      overflow={'hidden'}
      alignItems={'flex-start'}
      gap={10}
      justifyContent={'flex-start'}
      flexDir={'column'}
    >
      <Box
        display={'flex'}
        flexDir={'column'}
        w={'100%'}
        bg={details[currentBanner].gradient}
        h={'100vh'}
        position="relative"
      >
        <Banner
          prod={details[currentBanner].prod}
          func={handleNextBanner}
          img={details[currentBanner].img}
          title={details[currentBanner].title}
          sub1={details[currentBanner].sub1}
          sub2={details[currentBanner].sub2}
        />
        <Box display={{ md: 'none' }}>
          <Image
            width={300}
            height={400}
            src={fgts}
            alt='fgts mais valor'
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
          />
        </Box>
        <Box display={{ base: 'none', md: 'initial' }} >
          <Image
            width={600}
            height={400}
            src={fgts}
            alt='fgts mais valor'
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
          />
        </Box>
      </Box>

      <Box zIndex={9} bg={'white'} display={'flex'} flexDir={'column'} color={'black'} alignItems={'center'} justifyContent={'center'} w={'100%'}  >
        <Button
          mt={-4}
          mb={4}
          colorScheme="whatsapp"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={2}
          data-section="products"
          onClick={() => scrollToSection('products')}
          textAlign="center"
          fontWeight="bold"
          _hover={{ transform: 'translateY(-2px)' }}
          _active={{ transform: 'translateY(2px)' }}
        >
          <Text>Navegar</Text>
          <FaArrowDown />
        </Button>
      </Box>

    </Flex>
  );
}
