import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Outlet, Link } from "react-router-dom";

const PokemonCard = ({ pokemon, langage }) => {
  return (
    <Card sx={{ borderRadius: '16px', boxShadow: 3, width: 200, margin: 2, cursor: 'pointer' }} onClick={() => <Link to="/">Home</Link>}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6">{pokemon.names[langage]}</Typography>
        <img src={pokemon.image} alt={pokemon.names[langage]} style={{ width: '100%', borderRadius: '8px' }}/>
        <Box sx={{ marginTop: 1 }}>
          {pokemon.types.map((type) => (
            <Chip key={type} label={type} sx={{ margin: '2px', textTransform: 'capitalize' }} />
          ))}
        </Box>
      </CardContent>
    </Card>                                     
  );                                
};



export default PokemonCard;