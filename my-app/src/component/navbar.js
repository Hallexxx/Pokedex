import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LanguageSelector from './Language';

class Navbar extends React.Component {
  render() {
    const { language, onLanguageChange } = this.props;

    return (
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Pokedex
          </Typography>

          <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
