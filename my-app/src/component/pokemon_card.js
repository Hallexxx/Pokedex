import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

const PokemonCard = ({ pokemon, langage }) => {
  return (
    <Card sx={{ borderRadius: '16px', boxShadow: 3, width: 200, margin: 2 }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6">{pokemon.names[langage]}</Typography>
        <img src={pokemon.image} alt={pokemon.names[langage]} style={{ width: '100%', borderRadius: '8px' }}/>
        <Box sx={{ marginTop: 1 }}>
            <Chip key={pokemon.types} label={pokemon.types} sx={{ margin: '2px' }} />
        </Box>
      </CardContent>
    </Card>
  );
};



export default PokemonCard;