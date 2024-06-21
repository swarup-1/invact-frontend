import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import { store } from './Redux/store';
import {Provider} from "react-redux"
import AuthContextProvider from './Context/AuthContextProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
      <AuthContextProvider>
          <BrowserRouter>
            <Provider store={store}>
              <App />
            </Provider>
          </BrowserRouter>
      </AuthContextProvider>
    </ChakraProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

