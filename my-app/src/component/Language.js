import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';

const LanguageSelector = ({ language, onLanguageChange }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        sx={{ color: '#fff', marginRight: 2 }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="fr">Français</MenuItem>
        <MenuItem value="es">Español</MenuItem>
        <MenuItem value="ja">Japonais</MenuItem>
        <MenuItem value="it">Italien</MenuItem>
        <MenuItem value="de">Allemand</MenuItem>
      </Select>
    </Box>
  );
};

export default LanguageSelector;
