import React, { useState } from 'react';
import { Box, Text, Image, Flex, Checkbox, HStack, Icon, Button, Textarea } from '@chakra-ui/react';
import { AddIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { updateMovie } from '../Redux/controllers';
import { useDispatch, useSelector } from 'react-redux';

const MovieCard = ({ item }) => {
    const { movies, loading, error } = useSelector((store)=>store.movies)
    const dispatch = useDispatch()

  const yourRating = parseInt(item?.YourRating || 0)
  const [rating, setRating] = useState(yourRating)
  const [reviewText, setReviewText] = useState(item?.Review || '');
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [watched, setWatched] = useState(item?.Watched);

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        key={i}
        as={StarIcon}
        color={i <= rating ? "yellow.400" : "gray.300"}
        cursor="pointer"
        onClick={() => handleRatingClick(i)}
      />
    );
  }

  const handleRatingClick = async (selectedRating) => {
    setRating(selectedRating);
    try {
        const updatedMovie = { ...item, YourRating: selectedRating.toString() };
        await dispatch(updateMovie({ id: item._id, updatedMovie }));
        alert('Your rating updated successfully!');
      } catch (error) {
        console.error('error:', error);
      }

  };

  const handleWatched= async (e)=>{
    try {
        const updatedMovie = { ...item, Watched: e.target.checked };
        await dispatch(updateMovie({ id: item._id, updatedMovie }));
        alert(e.target.checked ? 'Remarked as Watched' : 'Remarked as Unwatched');
        setIsEditingReview(false)
        setWatched(updatedMovie.Watched)
      } catch (error) {
        console.error('error:', error);
      }
  }

  const handleToggleReview = () => {
    setIsEditingReview(!isEditingReview);
  };

  const handleSubmitReview = async () => {
    try {
      const updatedMovie = { ...item, Review: reviewText };
      await dispatch(updateMovie({ id: item._id, updatedMovie }));
      alert('Review updated successfully!');
      setIsEditingReview(false)
      setReviewText(updatedMovie.Review)
    } catch (error) {
      console.error('error:', error);
    }
  };

  return (
    <Box key={item?._id} bgColor="gray.100" p={4} borderRadius="md" boxShadow="md">
      <Flex alignItems="center" mb={4}>
        <Image src={item?.Poster} alt={item?.Title} boxSize="150px" objectFit="cover" mr={4} borderRadius="md" />
        <Box>
          <Text fontSize="xl" fontWeight="bold" mb={2}>{item?.Title}</Text>
          <Text fontSize="md" mb={1}>Released: {item?.Released}</Text>
          <Text fontSize="sm" mb={1}>Genre: {item?.Genre}</Text>
          <Text fontSize="sm" mb={1}>IMDB Ratings: {item?.imdbRating}</Text>
        </Box>
      </Flex>

      <Flex align="center" justify="space-between" mb={2}>
        <HStack spacing={2}>
          {stars}
        </HStack>
        <Checkbox defaultChecked={watched} colorScheme="green" size="lg" onChange={handleWatched}>
          {watched ? 'Watched' : 'Unwatched'}
        </Checkbox>
      </Flex>


      {item?.Review ? (
        <Textarea
          value={reviewText}
          size="sm"
          mb={2}
          readOnly
        />
      ) : 
        <Textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Enter your review..."
          size="sm"
          mb={2}
        />
      }

      <Button
        variant="outline"
        colorScheme="blue"
        leftIcon={isEditingReview ? null : item?.Review ? <Icon as={EditIcon} /> : <Icon as={AddIcon} />}
        onClick={isEditingReview ? handleSubmitReview : handleToggleReview}
      >
        {isEditingReview ? 'Submit' : item?.Review ? 'Edit Review' : 'Add Review'}
      </Button>

    </Box>
  );
};

export default MovieCard;
