import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, TextField, Select, MenuItem, Card, CardContent, CircularProgress, Grid } from '@mui/material';
import { styled } from '@mui/system';
import '../App.css';

// Classe pour la page d'accueil
function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchText, setSearchText] = useState(localStorage.getItem('searchText') || '');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPokemons();
    fetchTypes();
  }, []);

  const fetchPokemons = async () => {
    const response = await fetch('https://pokedex-jgabriele.vercel.app/pokemons.json');
    const data = await response.json();
    setPokemons(data);
    setFilteredPokemons(data);
    setLoading(false);
  };

  const fetchTypes = async () => {
    const response = await fetch('https://pokedex-jgabriele.vercel.app/types.json');
    const typesData = await response.json();
  
    // Vérifie que la réponse est un tableau, sinon gère les erreurs
    if (Array.isArray(typesData)) {
      setTypes(typesData);
    } else {
      console.error("La réponse de l'API des types n'est pas dans le format attendu.");
      setTypes([]);
    }
  };
  

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    localStorage.setItem('searchText', text);
    filterPokemons(text, selectedType, language);
  };

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    setLanguage(lang);
    localStorage.setItem('language', lang);
    filterPokemons(searchText, selectedType, lang);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    filterPokemons(searchText, type, language);
  };

  const filterPokemons = (searchText, selectedType, language) => {
    const filtered = pokemons.filter(pokemon => {
      const matchesText = pokemon.name[language].toLowerCase().includes(searchText.toLowerCase());
      const matchesType = selectedType ? pokemon.type.includes(selectedType) : true;
      return matchesText && matchesType;
    });
    setFilteredPokemons(filtered);
  };

  return (
    <Box>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Pokedex App</Typography>
          <Box>
            <Select value={language} onChange={handleLanguageChange} sx={{ color: '#fff', marginRight: 2 }}>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="es">Español</MenuItem>
            </Select>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Barre de recherche */}
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
        <TextField
          variant="outlined"
          label="Rechercher un Pokémon"
          value={searchText}
          onChange={handleSearchChange}
          sx={{ width: 300, marginRight: 2 }}
        />
        <Select value={selectedType} onChange={handleTypeChange} sx={{ width: 150 }}>
          <MenuItem value="">Tous les types</MenuItem>
          {types.map(type => (
            <MenuItem key={type.english} value={type.english}>
              {type[language]}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Liste des Pokémon */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {filteredPokemons.map(pokemon => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} language={language} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

const PokemonCard = ({ pokemon, language }) => {
    const pokemonName = pokemon.name && pokemon.name[language] ? pokemon.name[language] : 'Nom indisponible';
    const pokemonTypes = Array.isArray(pokemon.type) ? pokemon.type.join(', ') : 'Type indisponible';
  
    return (
      <Card sx={{ borderRadius: '16px', boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6">{pokemonName} (#{pokemon.id})</Typography>
          <Typography>Type: {pokemonTypes}</Typography>
        </CardContent>
      </Card>
    );
  };
  
  

export default Home;