import React from 'react';
import PokepediaComponent from './components/PokepediaComponent';
import Input from './components/Input';
import {InputProvider} from './context/InputContext';
import {DropDownProvider} from './context/DropDownContext';
import {TypeDexProvider} from './context/TypeDexContext';
import HomePage from './components/HomePage';
import {PokemonDataProvider} from './context/PokemonDataContext';

import { Routes, Route, Link, NavLink } from 'react-router-dom';


function App() {

  return (
    <>

      
      
      <PokemonDataProvider>
        <TypeDexProvider>
          <InputProvider>
            <DropDownProvider>
              <Input/>
              <Routes>
                <Route path="/pokepedia" element={<HomePage />} />
                <Route path="/pokedex" element={<PokepediaComponent />} />
                <Route path="/pokemon/:pokeName" element={<PokepediaComponent />} />
                <Route path="/pokedex/:typeName" element={<PokepediaComponent />} />
              </Routes>
            </DropDownProvider>
          </InputProvider>
        </TypeDexProvider>
      </PokemonDataProvider>
    </>
  );
}

export default App;
