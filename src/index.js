import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraBaseProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import { ChakraProvider } from '@chakra-ui/provider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}></ColorModeScript>
    <App />
    </ChakraProvider>
    
  </React.StrictMode>
);