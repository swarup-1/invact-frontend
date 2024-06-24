import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
let baseURL = 'https://movie-backend-omega.vercel.app'
export const getMovies = createAsyncThunk('movies/get', async (_) => {
    try {
        const res = await axios.get(`${baseURL}/planets/`);
        console.log('baseURL:', baseURL)
        return res.data;
    } catch (error) {
        console.log("Error:", error)
    }
});

export const addMovie = createAsyncThunk('movies/add', async (newMovie) => {
    try {
        const res = await axios.post(`${baseURL}/planets/`, newMovie);
        return res.data;
    } catch (error) {
        console.log("Error:", error)
    }
});

export const updateMovie = createAsyncThunk('movies/update', async ({ id, updatedMovie }) => {
      try {
        const res = await axios.patch(`${baseURL}/planets/${id}`, updatedMovie);
        console.log('res.data:', res.data)
        return res.data
      } catch (error) {
        console.log("Error:", error)
      }
    }
  );

export const deleteMovie = createAsyncThunk('movies/delete', async (id) => {
    try {
        await axios.delete(`${baseURL}/planets/${id}`);
        return id;
    } catch (error) {
        console.log("Error:", error)
    }
});
