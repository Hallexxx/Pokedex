import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import PokemonCard from './component/pokemon_card';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function App() {
    const [language, setLanguage] = useState('en');
    const [searchText, setSearchText] = useState('');
    
  
    const handleLanguageChange = (lang) => {
      setLanguage(lang);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };
    
    const handleSearchSubmit = () => {
        console.log("Rechercher Pokémon:", searchText);
    };
  
    const pokemons = [
        {
            name: "Pikachu",
            image: "https://example.com/pikachu.png",
            types: ["Electric"]
        },
        {
            name: "Charmander",
            image: "https://example.com/charmander.png",
            types: ["Fire"]
        },
        {
            name: "Bulbasaur",
            image: "https://example.com/bulbasaur.png",
            types: ["Grass", "Poison"]
        },
        // Ajoutez d'autres Pokémon ici
    ];
    
    return (
      <div>
        <Navbar language={language} onLanguageChange={handleLanguageChange}/>

        <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
            <TextField variant="outlined" label="Rechercher un Pokémon" value={searchText} onChange={handleSearchChange} sx={{ width: '80%', marginRight: 2 }}/>
            <IconButton color="primary" onClick={handleSearchSubmit}>
                <SearchIcon/>
            </IconButton>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {pokemons.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
        </Box>
      </div>
    );
  }

export default App;
