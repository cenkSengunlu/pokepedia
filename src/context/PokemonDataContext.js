import {createContext, useState} from 'react';

const PokemonDataContext = createContext();

export const PokemonDataProvider = ({children}) => {
  const [pokemonData, setPokemonData] = useState({
    id: null,
    name: null,
    info: null,
    form: [],
    species: null,
    types: null,
    typeMatchup: [],
    evolution: null
  });

  // const [title, setTitle] = useState("Pokédex | Poképedia");

  const values = {pokemonData, setPokemonData};

  return <PokemonDataContext.Provider value={values}>{children}</PokemonDataContext.Provider>;
};

export default PokemonDataContext;