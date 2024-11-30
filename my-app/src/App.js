import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import PokemonCard from './component/pokemon_card';
import PokemonDetail from './component/pokemon_details';
import PokemonList from './component/pokemon_list';
import SearchBar from './component/SearchBar';
import { Box } from '@mui/material';
import { useFetch } from './hooks/useFetch';

function App() {
  const [language, setLanguage] = useState('en');
  const [urlPokemons] = useState('https://pokedex-jgabriele.vercel.app/pokemons.json');
  const [urlTypes] = useState('https://pokedex-jgabriele.vercel.app/types.json');
  
  // Fetch pokemons et types
  const { data: pokemons, isPending: pokemonsPending, error: pokemonsError } = useFetch(urlPokemons);
  const { data: types, isPending: typesPending, error: typesError } = useFetch(urlTypes);

  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => {
    setInputText(e.target.value.toLowerCase());
  };
  
  const filteredPokemons = pokemons && pokemons.filter((pokemon) =>
    pokemon.names[language].toLowerCase().includes(inputText)
  );

  const handleLanguageChange = (lang) => setLanguage(lang);

  return (
    <BrowserRouter>
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      <Routes>
        <Route
          path="/"
          element={
            <Box sx={{ padding: 2 }}>
              <SearchBar onSearchChange={inputHandler} />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {(pokemonsPending || typesPending) && <div>Loading...</div>}
                {pokemonsError && <div>{pokemonsError}</div>}
                {typesError && <div>{typesError}</div>}
                {filteredPokemons && (
                  <PokemonList
                    data={filteredPokemons}
                    types={types}
                    language={language}
                  />
                )}
              </Box>
            </Box>
          }
        />
        <Route
          path="/pokemon/:pokemonName"
          element={
            <PokemonDetail pokemons={pokemons} types={types} language={language} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
