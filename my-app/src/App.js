import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import PokemonCard from './component/pokemon_card';
import PokemonDetail from './component/pokemon_details';
import { Box, TextField } from '@mui/material';
import { useFetch } from './hooks/useFetch';

function App() {
  const [language, setLanguage] = useState('en');
  const [url] = useState('https://pokedex-jgabriele.vercel.app/pokemons.json');
  const { data, isPending, error } = useFetch(url);

  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const filteredData = data && data.filter((el) =>
    el.names[language].toLowerCase().includes(inputText)
  );

  return (
    <BrowserRouter>
      <Navbar language={language} onLanguageChange={handleLanguageChange} />

      <Routes>
        <Route
          path="/"
          element={
            <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                label="Rechercher un Pokémon"
                onChange={inputHandler}
                sx={{ width: '80%', marginBottom: 2 }}
              />

              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {isPending && <div>Loading....</div>}
                {error && <div>{error}</div>}
                {filteredData &&
                  filteredData.map((pokemon) => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} language={language} />
                  ))}
              </Box>
            </Box>
          }
        />
        <Route path="/pokemon/:pokemonName" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
