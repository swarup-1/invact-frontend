import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getMovies = createAsyncThunk('movies/get', async (_) => {
    try {
        const res = await axios.get('http://localhost:8080/movies/');
        return res.data;
    } catch (error) {
        console.log("Error:", error)
    }
});

export const addMovie = createAsyncThunk('movies/add', async (newMovie) => {
    console.log('newMovie:', newMovie)
    try {
        const res = await axios.post('http://localhost:8080/movies/', newMovie);
        return res.data;
    } catch (error) {
        console.log("Error:", error)
    }
});

export const updateMovie = createAsyncThunk('movies/update', async ({ id, updatedMovie }) => {
      try {
        const res = await axios.patch(`http://localhost:8080/movies/${id}`, updatedMovie);
        console.log('res.data:', res.data)
        return res.data
      } catch (error) {
        console.log("Error:", error)
      }
    }
  );

export const deleteMovie = createAsyncThunk('movies/delete', async (id) => {
    try {
        await axios.delete(`http://localhost:8080/movies/${id}`);
        return id;
    } catch (error) {
        console.log("Error:", error)
    }
});
