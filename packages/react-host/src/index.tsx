import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from '@tanstack/react-router'

import { styled, ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux'
import CssBaseline from '@mui/material/CssBaseline';
import router from './routes';
import theme from './styles/theme';
import store from './store';
import Box from '@mui/material/Box';

const Wrapper = styled(Box)(({ theme }) => ({
  background: "#1976d2",
  height: "100vh",
  margin: "0"
}));

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)!
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Wrapper>
            <CssBaseline />
            <RouterProvider router={router} />
          </Wrapper>
        </Provider>
      </ThemeProvider>
    </StrictMode>
  )
}




