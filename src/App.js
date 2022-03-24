import React from 'react'

import PokepediaComponent from './components/PokepediaComponent';
// import InputComponent from './components/InputComponent';


function App() {
  // const [pokeName, setPokeName] = useState('');

  // useEffect(() => {
  //   console.log(pokeName);
  // }, [pokeName]);

  // const value = (name) => {
  //   setPokeName(name);
  // }

  return (
    <div className="App">
      {/* <InputComponent value={value} /> */}
      <PokepediaComponent/>
    </div>
  );
}

export default App;
