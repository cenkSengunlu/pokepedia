import React, {useEffect, useContext} from 'react';
import DropDownContext from '../context/DropDownContext';
import makeUpper from '../makeUpper';

function DropDown({pokeForm}) {
  const {selects, setSelects, setPokeInfo} = useContext(DropDownContext);

  useEffect(() =>{
    if(!selects){
      return;
    }

    setPokeInfo(pokeForm[selects]);
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