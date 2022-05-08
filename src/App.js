import React from 'react';
import PokepediaComponent from './components/PokepediaComponent';
import {InputProvider} from './context/InputContext';


function App() {

  return (
    <div className="App">
      <InputProvider>
        <PokepediaComponent/>
      </InputProvider>
      
    </div>
  );
}

export default App;
