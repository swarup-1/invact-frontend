import React, { useState } from 'react';
import { Container, Grid, Center, Stack, Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, Box, Image, Text } from '@chakra-ui/react';
import axios from 'axios';
import MovieCard from '../Components/MovieCard';
import { addMovie } from '../Redux/controllers';
import { useDispatch } from 'react-redux';

const Watchlist = ({ data }) => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch()

  let apiKey = '4c901ca1'

  const searchMovies = async (search) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${search}&apikey=${apiKey}`);
      if (response.data.Search) {
        setSearchResult(response.data.Search);
        onOpen();
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      console.error("Error fetching data from OMDB API:", error);
    }
  };

  const addToWatchlist = async (movie) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
      const res = response.data;
      const newMovie = {
        Title: res.Title,
        Year: res.Year,
        Released: res.Released,
        Runtime: res.Runtime,
        Genre: res.Genre,
        Director: res.Director,
        Writer: res.Writer,
        Actors: res.Actors,
        Plot: res.Plot,
        Language: res.Language,
        Country: res.Country,
        Awards: res.Awards,
        imdbRating: res.imdbRating,
        imdbID: res.imdbID,
        Poster: res.Poster,
        Watched: false,
        Review: '',
        YourRating: '0',
      };
      dispatch(addMovie(newMovie))
    } catch (error) {
      console.error("Error fetching detailed movie data from OMDB API:", error);
    }
  };

  return (
    <Container
      minW="100vw"
      minH="100vh"
      p="0px"
      bgColor="#18191A"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Stack direction={{ base: "column", md: "row" }} mb={6} w={{ base: '90%', md: '80%' }} mt={4}>
        <Input
          bgColor="white"
          color="black"
          placeholder="Search your movie & add to wishlist"
          pr="10px"
          height="50px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          bgColor="rgb(244,6,18)"
          height="50px"
          fontSize={{ base: "18px", md: "22px" }}
          pl="50px"
          pr="50px"
          minW={{ base: "100%", md: "unset" }}
          onClick={() => searchMovies(search)}
        >
          Search
        </Button>
      </Stack>
      <Center w="100%">
        <Grid
          w={{ base: '90%', md: '80%' }}
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={6}
        >
          {data.map((item) => (
            <MovieCard key={item?._id} item={item} />
          ))}
        </Grid>
      </Center>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#000" color="#fff" maxW={{ base: "80%", sm: '60%', md: "80%" }} mx={{ base: "10px", md: "auto" }} border="2px solid rgb(229,9,20)">
          <Center fontSize="20px" fontWeight="700" p="10px 0px">Search Results</Center>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={6}
            >
              {searchResult.map((item) => (
                <Box key={item.imdbID} p="4" bgColor="rgba(255, 255, 255, 0.1)" borderRadius="md" textAlign="center">
                  <Image src={item.Poster} alt={item.Title} mb="2" />
                  <Text fontSize="lg" fontWeight="bold" color="white">{item.Title}</Text>
                  <Text fontSize="md" color="gray.300">{item.Year}</Text>
                  <Button
                    mt="2"
                    bgColor="rgb(244,6,18)"
                    color="white"
                    _hover={{ bgColor: "rgba(244,6,18, 0.8)" }}
                    onClick={() => addToWatchlist(item)}
                  >
                    Add to Watchlist
                  </Button>
                </Box>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Watchlist;
