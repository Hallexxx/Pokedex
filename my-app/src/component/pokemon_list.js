import React from 'react';
import PokemonCard from './pokemon_card';

const PokemonList = ({ data, language }) => {
    return (
      <>
        {data && data.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} language={language} />
        ))}
      </>
    );
};

export default PokemonList;
