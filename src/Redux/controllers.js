import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
// let baseURL = 'https://invact-backend.vercel.app'
let baseURL = 'http://localhost:8080'
export const getMovies = createAsyncThunk('movies/get', async (_) => {
    try {
        const res = await axios.get(`${baseURL}/movies/`);
        console.log('baseURL:', baseURL)
        return res.data;
    } catch (error) {
        console.log("Error:", error)
    }
});

export const addMovie = createAsyncThunk('movies/add', async (newMovie) => {
    console.log('newMovie:', newMovie)
    try {
        const res = await axios.post(`${baseURL}/movies/`, newMovie);
        return res.data;
    } catch (error) {
        console.log("Error:", error)
    }
});

export const updateMovie = createAsyncThunk('movies/update', async ({ id, updatedMovie }) => {
      try {
        const res = await axios.patch(`${baseURL}/movies/${id}`, updatedMovie);
        console.log('res.data:', res.data)
        return res.data
      } catch (error) {
        console.log("Error:", error)
      }
    }
  );

export const deleteMovie = createAsyncThunk('movies/delete', async (id) => {
    try {
        await axios.delete(`${baseURL}/movies/${id}`);
        return id;
    } catch (error) {
        console.log("Error:", error)
    }
});
