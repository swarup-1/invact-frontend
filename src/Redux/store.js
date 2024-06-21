import { configureStore } from "@reduxjs/toolkit";
import MoviesSlice from "./MoviesSlice";

export const store = configureStore({
    reducer: {
        movies: MoviesSlice
    }
})