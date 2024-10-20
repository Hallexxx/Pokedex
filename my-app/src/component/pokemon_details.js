import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';

const PokemonDetail = ({ language }) => {
  const { pokemonName } = useParams();
  const [openDialog, setOpenDialog] = useState(false);

  const pokemonInfo = {
    weight: '85 kg',
    height: '1.7 m',
    moves: ['Move 1', 'Move 2', 'Move 3', 'Move 4'], // Exemple de moves
  };

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4">{pokemonName}</Typography>
      <Typography variant="body1">Poids: {pokemonInfo.weight}</Typography>
      <Typography variant="body1">Taille: {pokemonInfo.height}</Typography>

      <Button variant="contained" color="primary" onClick={handleDialogOpen}>
        Voir les Moves
      </Button>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Moves de {pokemonName}</DialogTitle>
        <DialogContent>
          <ul>
            {pokemonInfo.moves.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PokemonDetail;
