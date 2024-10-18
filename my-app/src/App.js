import React, { useState } from 'react';
import Navbar from './component/navbar';
import PokemonCard from './component/pokemon_card';
import { Box, TextField } from '@mui/material';
import { useFetch } from './hooks/useFetch';

function App() {
  const [language, setLanguage] = useState('en');
  const [url] = useState('https://pokedex-jgabriele.vercel.app/pokemons.json');
  const { data, isPending, error } = useFetch(url);

  const [inputText, setInputText] = useState('');
  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  const filteredData = data && data.filter((el) =>
    el.names[language].toLowerCase().includes(inputText)
  );

  return (
    <div>
      <Navbar language={language} onLanguageChange={handleLanguageChange} />

      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
        <TextField
          variant="outlined"
          label="Rechercher un Pokémon"
          onChange={inputHandler}
          sx={{ width: '80%', marginRight: 2 }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {isPending && <div>Loading....</div>}
        {error && <div>{error}</div>}
        {filteredData &&
          filteredData.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} language={language} />
          ))}
      </Box>
    </div>
  );
}

export default App;
