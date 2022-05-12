import {createContext, useState} from 'react';

const DropDownContext = createContext();

export const DropDownProvider = ({children}) => {
  const [selects, setSelects] = useState(0);
  const [pokeInfo, setPokeInfo] = useState(null);

  const values = {selects, setSelects, pokeInfo, setPokeInfo};

  return <DropDownContext.Provider value={values}>{children}</DropDownContext.Provider>;
};

export default DropDownContext;