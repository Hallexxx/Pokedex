import React from 'react';
import { Box, TextField } from '@mui/material';

const SearchBar = ({ onSearchChange }) => {
  return (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <TextField
        variant="outlined"
        label="Rechercher un Pokémon"
        onChange={onSearchChange}
        sx={{ width: '80%'}}
      />
    </Box>
  );
};

export default SearchBar;
