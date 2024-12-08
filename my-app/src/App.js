import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar';
import PokemonDetail from './component/pokemon_details';
import PokemonList from './component/pokemon_list';
import FilterByType from './component/FilterByType';
import SearchBar from './component/SearchBar';
import { Box } from '@mui/material';
import { useFetch } from './hooks/useFetch';
import { LanguageContext } from './contexts/LanguageContext';

function App() {
  const { language } = useContext(LanguageContext);
  const [urlPokemons] = useState('https://pokedex-jgabriele.vercel.app/pokemons.json');
  const [urlTypes] = useState('https://pokedex-jgabriele.vercel.app/types.json');

  const { data: pokemons, isPending: pokemonsPending, error: pokemonsError } = useFetch(urlPokemons);
  const { data: types, isPending: typesPending, error: typesError } = useFetch(urlTypes);

  const [inputText, setInputText] = useState('');
  const inputHandler = (e) => setInputText(e.target.value.toLowerCase());

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [isAndMode, setIsAndMode] = useState(false);

  const filteredPokemons = pokemons?.filter((pokemon) => {
    const matchesName = pokemon.names[language]?.toLowerCase().includes(inputText);
    const matchesTypes =
      selectedTypes.length === 0 ||
      (isAndMode
        ? selectedTypes.every((typeId) => pokemon.types.includes(typeId))
        : selectedTypes.some((typeId) => pokemon.types.includes(typeId)));

    return matchesName && matchesTypes;
  });

  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Box sx={{ padding: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SearchBar onSearchChange={inputHandler} />
                  <FilterByType
                    types={types || []}
                    selectedTypes={selectedTypes}
                    onTypeChange={setSelectedTypes}
                    isAndMode={isAndMode}
                    onModeChange={setIsAndMode}
                  />
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {(pokemonsPending || typesPending) && <div>Loading...</div>}
                {pokemonsError && <div>{pokemonsError}</div>}
                {typesError && <div>{typesError}</div>}
                {filteredPokemons && (
                  <PokemonList data={filteredPokemons} types={types} />
                )}
              </Box>
            </Box>
          }
        />
        <Route
          path="/pokemon/:pokemonName"
          element={<PokemonDetail pokemons={pokemons} types={types} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;