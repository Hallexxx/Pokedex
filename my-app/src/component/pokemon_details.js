import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useFetch } from '../hooks/useFetch';

const PokemonDetail = ({ language }) => {
  const { pokemonName } = useParams(); 
  const [openDialog, setOpenDialog] = useState(false);
  const [url] = useState('https://pokedex-jgabriele.vercel.app/pokemons.json');
  const { data: pokemons, isPending, error } = useFetch(url);

  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    if (pokemons && Array.isArray(pokemons)) {
      const foundPokemon = pokemons.find(p => 
        p.names && 
        p.names[language] && 
        p.names[language].toLowerCase() === pokemonName.toLowerCase()
      );
      setSelectedPokemon(foundPokemon);
    }
  }, [pokemons, pokemonName, language]);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!selectedPokemon) {
    return <div>Pokémon not found.</div>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4">{pokemonName}</Typography>
      <Typography variant="body1">Poids: {selectedPokemon.weight}</Typography>
      <Typography variant="body1">Taille: {selectedPokemon.height}</Typography>

      <Button variant="contained" color="primary" onClick={handleDialogOpen}>
        Voir les Moves
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Moves de {pokemonName}</DialogTitle>
        <DialogContent>
          <ul>
            {selectedPokemon.moves && selectedPokemon.moves.length > 0 ? (
              selectedPokemon.moves.map((move, index) => (
                <li key={index}>{move}</li>
              ))
            ) : (
              <li>Aucun move disponible</li>
            )}
          </ul>
        </DialogContent>
      </Dialog> 
    </Box>
  );
};

export default PokemonDetail;
