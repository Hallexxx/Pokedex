import React, { useContext } from 'react';
import PokemonCard from './pokemon_card';
import { LanguageContext } from '../contexts/LanguageContext';

const PokemonList = ({ data, types }) => {
  const { language } = useContext(LanguageContext);

  return (
    <>
      {data.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} types={types} language={language} />
      ))}
    </>
  );
};

export default PokemonList;
