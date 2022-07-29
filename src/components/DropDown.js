import React, {useEffect, useContext} from 'react';
import DropDownContext from '../context/DropDownContext';
import PokemonDataContext from '../context/PokemonDataContext';
import makeUpper from '../makeUpper';

function DropDown({pokeForm}) {
  const {selects, setSelects} = useContext(DropDownContext);
  const {setPokemonData} = useContext(PokemonDataContext);
  useEffect(() =>{
    if(!selects){
      return;
    }
    setPokemonData(pokemonData => ({...pokemonData, info:pokeForm[selects]}));
    // setPokeInfo(pokeForm[selects]);
  }, [selects, pokeForm]);

  return (
    <>
      {pokeForm &&
        <select value={selects} onChange={e => setSelects(e.target.value)} className="w-48 mb-10 rounded-lg modeDropdown" id="dropList">
        {
          pokeForm.map((x, i) => {
            return(
              <option key={i} className={'p-5'} value={i}>{makeUpper(x.name.replaceAll('-', ' '))}</option>
            )
          })
        }
        </select>
      }
    </>
    
  )
}

export default DropDown;