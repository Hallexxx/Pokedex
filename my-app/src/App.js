import React, { useState, useEffect } from 'react';
import Navbar from './component/navbar';
import PokemonCard from './component/pokemon_card';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useFetch } from "./hooks/useFetch";

function App() {
    const [language, setLanguage] = useState('en');
    const [searchText, setSearchText] = useState('');
    const [url, setUrl] = useState("https://pokedex-jgabriele.vercel.app/pokemons.json");
    const { data, isPending, error } = useFetch(url);
    
  
    const handleLanguageChange = (lang) => {
      setLanguage(lang);
    };

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };
    
    const handleSearchSubmit = () => {
        console.log("Rechercher Pokémon:", searchText);
    };
    
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
            {isPending && <div>Loading....</div>}
            {error && <div>{error}</div>}
            {data && data.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} langage={language} />
            ))}
        </Box>
      </div>
    );
  }

export default App;
