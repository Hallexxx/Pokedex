import React from 'react';
import { Box, TextField } from '@mui/material';

const SearchBar = ({ onSearchChange }) => {
    return (
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
        <TextField
          variant="outlined"
          label="Rechercher un Pokémon"
          onChange={onSearchChange}
          sx={{ width: '80%', marginRight: 2 }}
        />
      </Box>
    );
};

export default SearchBar;
