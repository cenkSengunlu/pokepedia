import {createContext, useState} from 'react';

const TypeDexContext = createContext();

export const TypeDexProvider = ({children}) => {
  const [typeDex, setTypeDex] = useState('');
  const [title, setTitle] = useState("Pokédex | Poképedia");
  

  const values = {typeDex, setTypeDex, title, setTitle};

  return <TypeDexContext.Provider value={values}>{children}</TypeDexContext.Provider>;
};

export default TypeDexContext;