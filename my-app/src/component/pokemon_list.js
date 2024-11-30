import React from 'react';
import PokemonCard from './pokemon_card';

const PokemonList = ({ data, types, language }) => {
    return (
      <>
        {data && data.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} types={types} language={language} />
        ))}
      </>
    );
};

export default PokemonList;
