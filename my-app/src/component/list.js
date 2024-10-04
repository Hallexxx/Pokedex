// import React, { useState, useEffect } from 'react';
// import { Box, TextField, IconButton } from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';
// import { useFetch } from "../hooks/useFetch";

// function List(props) {
    
//     const [url, setUrl] = useState("https://pokedex-jgabriele.vercel.app/pokemons.json");
//     const { data, isPending, error } = useFetch(url);

//     const filteredData = data && data.filter((el) => {
//         if (props.input === '') {
//             return el;
//         }
//         else {
//             return el.text.toLowerCase().includes(props.input)
//         }
//     })
//     return (
//         <ul>
//             {filteredData && filteredData.map((pokemon) => (
//                 <li key={pokemon.id}>{pokemon.names}</li>
//             ))}
//         </ul>
//     )
// }

// export default List