import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import LanguageSelector from './Language';
import logo from '../logo.png';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(LanguageContext);

  const handleLogoClick = () => navigate('/');

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleLogoClick}>
          <img src={logo} alt="Pokedex Logo" style={{ height: 80, borderRadius: '8px' }} />
        </Box>
        <LanguageSelector language={language} onLanguageChange={setLanguage} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
