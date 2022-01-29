import React from 'react';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar, Typography } from '@mui/material';
import './App.css';
import Roster from './components/Roster/Roster';

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Roster
        </Typography>
      </Toolbar>
      </AppBar>
    <Roster />
    </ThemeProvider>
    
    </>
    
  );
}

export default App;
