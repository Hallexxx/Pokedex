import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

const PokemonCard = ({ pokemon, language }) => {
  const [typesData, setTypesData] = useState([]);
  const { data: fetchedTypes } = useFetch('https://pokedex-jgabriele.vercel.app/types.json');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (fetchedTypes && typeof fetchedTypes === 'object') {
      const typesArray = Object.entries(fetchedTypes);

      const pokemonTypes = pokemon.types.map((typeId) => {
        const foundType = typesArray.find(([key]) => key === typeId);
        if (foundType) {
          const traductions = foundType[1].translations;

          const translatedName = traductions[language] || traductions['en'] || traductions['fr'] || Object.values(traductions)[0];

          return {
            name: translatedName,
            color: foundType[1].backgroundColor,
          };
        }
        return null;
      }).filter((type) => type !== null);

      setTypesData(pokemonTypes);
    } else {
      console.error('Les types de Pokémon récupérés ne sont pas valides:', fetchedTypes);
    }
  }, [fetchedTypes, pokemon.types, language]);

  const pokemonName = pokemon.names && (pokemon.names[language] || pokemon.names['en'] || pokemon.names['fr'] || Object.values(pokemon.names)[0]);

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemonName}`);
  };

  return (
    <Card
      sx={{ borderRadius: '16px', boxShadow: 3, width: 200, margin: 2 }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6">{pokemonName}</Typography>
        <img src={pokemon.image} alt={pokemonName} style={{ width: '100%', borderRadius: '8px' }} />
        <Box sx={{ marginTop: 1 }}>
          {typesData && typesData.map((type, index) => (
              <Chip key={index} label={type.name} sx={{ margin: '2px', textTransform: 'capitalize', backgroundColor: type.color, }} />
            ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
