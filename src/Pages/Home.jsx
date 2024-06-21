
import {
    Button,
    Center,
    Container,
    Heading,
    Input,
    Stack,
    Text,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../Redux/controllers";
import mainBackground from "../Assets/main_background.jpg"
import Navbar from "../Components/Navbar/Navbar"
  
const Home = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getMovies())
    },[])

    return (
      <Container minW="100%" p="0px"  bgColor="#000">
        <Container
          justifyItems={"center"}
          style={{
            boxShadow: `
              inset 100px 100px 500px rgba(0, 0, 0, 1),
              inset -100px -100px 500px rgba(0, 0, 0, 1),
              inset 0px 0px 200px rgba(0, 0, 0, 0.5)
            `,
          }}
          minW="100%"
          h="100vh"
          bgImage={mainBackground}
          bgSize="cover"
          bgPosition="center"
        >

          <Navbar />

          <Center
            color="white"
            borderRadius="40px"
            pt="80px"
          >
            <Stack gap="5px"  justifyContent={"center"} textAlign="center">
                <Heading as={"h2"} fontSize={{base:"40px",md:"55px"}} maxW={"590px"}>
                Make your own WatchList
                </Heading>
                <Text fontWeight={"600"} fontSize={{base:"17px",md:"20px"}}>
                Ready to watch? Create an account & start exploring your favourite
                </Text>
                
            </Stack>
            </Center>
        </Container>
      </Container>
    );
  };

  export default Home