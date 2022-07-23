import {createContext, useState} from 'react';

const TypeDexContext = createContext();

export const TypeDexProvider = ({children}) => {
  const [typeDex, setTypeDex] = useState('');
  const [pokedex, setPokedex] = useState([]);
  const [title, setTitle] = useState("Poképedia");
  // const [pokeInfo, setPokeInfo] = useState();
  const [poke404Error, setPoke404Error] = useState(false);
  

  const values = {typeDex, setTypeDex, title, setTitle, pokedex, setPokedex, poke404Error, setPoke404Error};

  return <TypeDexContext.Provider value={values}>{children}</TypeDexContext.Provider>;
};

export default TypeDexContext;