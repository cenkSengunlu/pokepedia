import {createContext, useState} from 'react';

const InputContext = createContext();

export const InputProvider = ({children}) => {
  const [pokeName, setPokeName] = useState(null);

  const values = {pokeName, setPokeName};

  return <InputContext.Provider value={values}>{children}</InputContext.Provider>;
};

export default InputContext;