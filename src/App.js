import React from 'react';
import PokepediaComponent from './components/PokepediaComponent';
import {InputProvider} from './context/InputContext';
import {DropDownProvider} from './context/DropDownContext';
import {TypeDexProvider} from './context/TypeDexContext';


function App() {

  return (
    <div className="App">
      <TypeDexProvider>
        <InputProvider>
          <DropDownProvider>
            <PokepediaComponent/>
          </DropDownProvider>
        </InputProvider>
      </TypeDexProvider>
      
    </div>
  );
}

export default App;
