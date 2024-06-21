import { createSlice } from '@reduxjs/toolkit';
import { getMovies, addMovie, updateMovie, deleteMovie } from './controllers';

const initialState = {
  movies: [],
  loading: false,
  error: false
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      
      // POST
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.meta.arg);
        state.loading = false;
        state.error = false;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      
      // UPDATE
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const updatedMovie = action.meta.arg;
        state.movies = state.movies.map(movie =>{
          if(movie._id === updatedMovie._id){
            return {...movie, ...updatedMovie}
          }
          return {...movie}
        }
        );      
        state.loading = false;
        state.error = false;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      
      // DELETE
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        const _id = action.payload;
        state.movies = state.movies.filter(movie => movie._id !== _id);
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  }
});

export default moviesSlice.reducer;
