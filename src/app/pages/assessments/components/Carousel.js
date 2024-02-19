'use client'
import React, { useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import Image from 'next/image';
import bb from '@/images/bancos/bb.png';
import bmg from '@/images/bancos/bmg.png';
import bancoPan from '@/images/bancos/banco pan.png';
import bradesco from '@/images/bancos/bradesco.png';
import brb from '@/images/bancos/brb.png';
import c6 from '@/images/bancos/c6 bank.png';
import crefaz from '@/images/bancos/crefaz.png';
import crefisa from '@/images/bancos/crefisa.png';
import daycoval from '@/images/bancos/daycoval.png';
import facta from '@/images/bancos/facta.png';
import inbursa from '@/images/bancos/inbursa.png';
import master from '@/images/bancos/master.jpeg';
import ole from '@/images/bancos/ole consignado.png';
import parana from '@/images/bancos/parana consignado.png';
import safra from '@/images/bancos/safra.png';
import santander from '@/images/bancos/santander.png';

const logos = [
  bb,
  bmg,
  bancoPan,
  brb,
  bradesco,
  c6,
  crefaz,
  crefisa,
  daycoval,
  inbursa,
  master,
  ole,
  safra,
  facta,
  parana,
  santander
];

const imagesPerSlide = 6;

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % (logos.length - imagesPerSlide + 1));
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Flex m={'0 auto'} gap={4} alignItems={'center'} justifyContent={'center'} paddingInline={8} w={'100%'}>
      {logos.slice(currentSlide, currentSlide + imagesPerSlide).map((logo, index) => (
        <Box height={{ base: '50px', md: '100px' }} width={{ base: '50px', md: '100px' }} key={index} style={{  zIndex: 0 }}>
          <Image src={logo} style={{ borderRadius: '10px', boxShadow: '2px 4px 10px 4px #ccc' }} alt={`logo banco ${currentSlide + index + 1}`} />
        </Box>
      ))}
    </Flex>
  );
};

export default Carousel;