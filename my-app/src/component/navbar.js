import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import LanguageSelector from './Language';
import logo from '../logo.png';

class Navbar extends React.Component {
  render() {
    const { language, onLanguageChange } = this.props;

    return (
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Pokedex Logo" style={{ height: 80, borderRadius: '8px' }} />
          </Box>
          <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
