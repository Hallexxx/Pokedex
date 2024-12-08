import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, Chip } from '@mui/material';
import { LanguageContext } from '../contexts/LanguageContext';

const PokemonDetail = ({ pokemons, types }) => {
  const { language } = useContext(LanguageContext);
  const { pokemonName } = useParams();
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [typesData, setTypesData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (pokemons) {
      const foundPokemon = pokemons.find((p) =>
        Object.values(p.names).some(
          (name) => name.toLowerCase() === pokemonName.toLowerCase()
        )
      );
      setSelectedPokemon(foundPokemon || null);
    }
  }, [pokemons, pokemonName]);

  useEffect(() => {
    if (selectedPokemon && types) {
      const typesArray = Object.entries(types);
      const pokemonTypes = selectedPokemon.types.map((typeId) => {
        const foundType = typesArray.find(([key]) => key === typeId);
        if (foundType) {
          const traductions = foundType[1].translations;
          const translatedName =
            traductions[language] || traductions['en'] || traductions['fr'] || Object.values(traductions)[0];
          return {
            name: translatedName,
            color: foundType[1].backgroundColor,
          };
        }
        return null;
      }).filter((type) => type !== null);
      setTypesData(pokemonTypes);
    }
  }, [selectedPokemon, types, language]);

  const navigateToNextPokemon = () => {
    const currentIndex = pokemons.indexOf(selectedPokemon);
    const nextIndex = (currentIndex + 1) % pokemons.length; 
    navigate(`/pokemon/${pokemons[nextIndex].names[language]}`);
  };

  const navigateToPrevPokemon = () => {
    const currentIndex = pokemons.indexOf(selectedPokemon);
    const prevIndex = (currentIndex - 1 + pokemons.length) % pokemons.length; 
    navigate(`/pokemon/${pokemons[prevIndex].names[language]}`);
  };

  if (!selectedPokemon) {
    return <div>Pokémon nommé "{pokemonName}" introuvable.</div>;
  }

  const heightInMeters = (selectedPokemon.height / 10).toFixed(1);
  const weightInKg = (selectedPokemon.weight / 10).toFixed(1);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          textAlign: 'center',
          position: 'relative',
          width: '350px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)', 
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Typography sx={{ position: 'absolute', top: '10px', left: '10px', fontWeight: 'bold' }}>
          #{selectedPokemon.id}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <Button onClick={navigateToPrevPokemon} sx={{ backgroundColor: 'transparent', color: 'black', fontSize: '2rem' }}>
            ←
          </Button>
          <Typography variant="h4" gutterBottom sx={{ flexGrow: 1 }}>
            {selectedPokemon.names[language] || pokemonName}
          </Typography>
          <Button onClick={navigateToNextPokemon} sx={{ backgroundColor: 'transparent', color: 'black', fontSize: '2rem' }}>
            →
          </Button>
        </Box>

        <img
          src={selectedPokemon.image}
          alt={selectedPokemon.names[language]}
          style={{ width: '300px', height: 'auto', marginBottom: '16px' }}
        />
        <Typography variant="body1">{weightInKg} kg</Typography>
        <Typography variant="body1">{heightInMeters} m</Typography>

        <Box sx={{ marginTop: 2 }}>
          {typesData.map((type, index) => (
            <Chip
              key={index}
              label={type.name}
              sx={{
                margin: '4px',
                backgroundColor: type.color,
                color: 'white',
                textTransform: 'capitalize',
              }}
            />
          ))}
        </Box>

        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ marginTop: 2, width: '100%' }}>
          Voir les Moves
        </Button>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Moves de {selectedPokemon.names[language] || pokemonName}</DialogTitle>
          <DialogContent>
            <ul>
              {selectedPokemon.moves && selectedPokemon.moves.length > 0 ? (
                selectedPokemon.moves.map((move, index) => <li key={index}>{move}</li>)
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
