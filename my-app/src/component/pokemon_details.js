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
  const [loadingMessage, setLoadingMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMessage(false);
    }, 1000);

    if (pokemons && Array.isArray(pokemons)) {
      const foundPokemon = pokemons.find((p) => {
        return Object.values(p.names).some(
          (name) => name.toLowerCase().trim() === pokemonName.toLowerCase().trim()
        );
      });

      if (foundPokemon) {
        setSelectedPokemon(foundPokemon);
      } 
    }
    return () => clearTimeout(timer);
  }, [pokemons, pokemonName]);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  if (isPending || loadingMessage) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!selectedPokemon) {
    return <div>Pokémon nommé "{pokemonName}" introuvable.</div>;
  }

  const heightInMeters = (selectedPokemon.height / 10).toFixed(1);
  const weightInKg = (selectedPokemon.weight / 10).toFixed(1);

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#f0f0f0' 
      }}
    >
      <Box 
        sx={{ 
          backgroundColor: 'white', 
          borderRadius: 2, 
          boxShadow: 3, 
          padding: 4, 
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {selectedPokemon.names[language] || pokemonName}
        </Typography>
        <img 
          src={selectedPokemon.image} 
          alt={selectedPokemon.names[language]} 
          style={{ width: '300px', height: 'auto', marginBottom: '16px' }} 
        />
        <Typography variant="body1">{weightInKg} kg</Typography>
        <Typography variant="body1">{heightInMeters} m</Typography>
        
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {selectedPokemon.types.join(', ')}
        </Typography>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleDialogOpen} 
          sx={{ marginTop: 2, width: '100%' }}
        >
          Voir les Moves
        </Button>

        <Dialog 
          open={openDialog} 
          onClose={handleDialogClose} 
          maxWidth="sm"
          fullWidth 
        >
          <DialogTitle>
            Moves de {selectedPokemon.names[language] || pokemonName}
          </DialogTitle>
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
    </Box>
  );
};

export default PokemonDetail;
