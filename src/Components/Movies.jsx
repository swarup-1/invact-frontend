import React from 'react';
import { Grid, Box, Text } from '@chakra-ui/react';
import MovieCard from './MovieCard';

const Movies = ({ data }) => {
  console.log('data:', data);

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
      gap={6}
      p={6}
    >
      {data.map(item => (
        <MovieCard key={item?._id} item={item}/>
      ))}
    </Grid>
  );
};

export default Movies;
