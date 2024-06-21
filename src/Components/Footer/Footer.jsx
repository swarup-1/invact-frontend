import React from 'react';
import { Box, Text, Link, Stack, HStack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box 
      bg="black" 
      color="white" 
      py={4} 
      px={8} 
      textAlign="center"
    >
      <HStack spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          © 2024 Your Company
        </Text>
        <Text>
          Follow us on 
          <Link href="https://twitter.com" isExternal color="red.500" ml={2}>
            Twitter
          </Link>
          ,
          <Link href="https://facebook.com" isExternal color="red.500" ml={2}>
            Facebook
          </Link>
          ,
          <Link href="https://instagram.com" isExternal color="red.500" ml={2}>
            Instagram
          </Link>
        </Text>
      </HStack>
    </Box>
  );
}

export default Footer;
