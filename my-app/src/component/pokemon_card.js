import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ pokemon, types, language }) => {
  const [typesData, setTypesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (types) {
      const typesArray = Object.entries(types);
      const pokemonTypes = pokemon.types.map((typeId) => {
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
  }, [types, pokemon.types, language]);

  const pokemonName = pokemon.names && (pokemon.names[language] || pokemon.names['en'] || pokemon.names['fr'] || Object.values(pokemon.names)[0]);

  const handleCardClick = () => {
    navigate(`/pokemon/${pokemonName}`);
  };

  const formattedId = String(pokemon.id).padStart(3, '0');

  return (
    <Card
      sx={{
        position: 'relative',
        borderRadius: '16px',
        boxShadow: 3,
        width: 200,
        margin: 2,
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
        },
      }}
      onClick={handleCardClick}
    >
      <Typography
        variant="subtitle2"
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          fontWeight: 'bold',
          color: 'rgba(0, 0, 0, 0.6)',
        }}
      >
        #{formattedId}
      </Typography>

      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6">{pokemonName}</Typography>
        <img src={pokemon.image} alt={pokemonName} style={{ width: '100%', borderRadius: '8px' }} />
        <Box sx={{ marginTop: 1 }}>
          {typesData && typesData.map((type, index) => (
            <Chip
              key={index}
              label={type.name}
              sx={{
                margin: '2px',
                textTransform: 'capitalize',
                backgroundColor: type.color,
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
