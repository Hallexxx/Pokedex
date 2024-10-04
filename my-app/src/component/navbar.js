// src/components/Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

class Navbar extends React.Component {
  render() {
    const { language, onLanguageChange } = this.props;

    return (
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Pokedex
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ marginRight: 2, cursor: 'pointer' }} onClick={() => alert('Menu 1 clicked')}>
                Menu 1
            </Typography>
            <Typography variant="body1" sx={{ marginRight: 2, cursor: 'pointer' }} onClick={() => alert('Menu 2 clicked')}>
                Menu 2
            </Typography>
            <Typography variant="body1" sx={{ marginRight: 2, cursor: 'pointer' }} onClick={() => alert('Menu 3 clicked')}>
                Menu 3
            </Typography>

            <Select value={language} onChange={(e) => onLanguageChange(e.target.value)} sx={{ color: '#fff', marginRight: 2 }}>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="es">Español</MenuItem>
              <MenuItem value="ja">Japonais</MenuItem>
              <MenuItem value="it">Italien</MenuItem>
              <MenuItem value="de">Allemands</MenuItem>
              <MenuItem value="roomaji">Les roumains</MenuItem>
            </Select>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
