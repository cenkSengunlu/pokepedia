import React, {useState, useContext, useRef, useEffect} from 'react';
import InputContext from '../context/InputContext';
import TypeDexContext from '../context/TypeDexContext';
import DropDownContext from '../context/DropDownContext';
import autoCompleteArr from '../autoCompleteArr';
import { NavLink, useNavigate } from 'react-router-dom';

import PokemonDataContext from '../context/PokemonDataContext';

function Input() {
  const navigate = useNavigate();
  const {setPokemonData} = useContext(PokemonDataContext);
  // const {setPokeName} = useContext(InputContext);
  // const {setPokeInfo} = useContext(DropDownContext);
  const {setTypeDex, setTitle, setPoke404Error} = useContext(TypeDexContext);
  const [inputVal, setInputVal] = useState("");
  const [result, setResult] = useState([]);
  
  const inputRef = useRef();



  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const handleClickOutside = (e) => {
    if(inputRef.current && !inputRef.current.contains(e.target)){
      setResult([]);
    }
  }

  const getValue = (val) => { 
    const { value } = val.target;
    const re = /[a-zA-ZüğşçöıÜĞŞİÇÖI 0-9]/;


    if(value === "" || re.test(value)){
      
      
      if(value){
        // console.log(autoCompleteArr.sort().filter((item) => item.toLowerCase().includes(value.toLowerCase())));
        setResult(autoCompleteArr.sort().filter((item) => item.toLowerCase().includes(value.toLowerCase())).slice(0,12));
        
      }else {
        setResult([]);
      }
      setInputVal(val.target.value);
    }
  }

  const handleClick = (ev = '') => {
    if(inputVal.trim() === ''){
      return;
    }

    if(ev === 'Enter'){
      document.querySelector('.inputClass').blur();
    }
    navigate(`/pokemon/${inputVal.toLowerCase()}`);
    setPokemonData(pokemonData => ({...pokemonData, name: inputVal.toLowerCase()}));
    // setPokeName(inputVal.toLowerCase());
    setInputVal('');
    setResult([]);
  }

  return (
    <>
    {result && 
    <div className="search flex justify-between items-center w-full p-5 bg-neutral-800 mb-5">
      <div>

      
        <NavLink to='/pokepedia'
          className='text-2xl text-white cursor-pointer' 
          onClick={() => {
            setTitle('Poképedia');
            // setPokeInfo(null);
            setPoke404Error(false);
            // setPokeName('');
            setTypeDex('');
            setPokemonData(pokemonData => ({...pokemonData, id: null, name: null, info: null, form: [], species: null, types: null, typeMatchup: [], evolution: null}));
          }}
        >
          Poképedia
        </NavLink>

        <NavLink to='/pokedex' 
          className='text-lg ml-12 text-white cursor-pointer'  
          onClick={() => {
            setTitle("Pokédex | Poképedia");
            // setPokeInfo(null);
            setPoke404Error(false);
            // setPokeName('');
            setTypeDex('');
            setPokemonData(pokemonData => ({...pokemonData, id: null, name: null, info: null, form: [], species: null, types: null, typeMatchup: [], evolution: null}));
          }}
        >
          Pokédex
        </NavLink>
      </div>

      <div className='flex items-center'>
        <div className=' relative' ref={inputRef}>
          <input type="text" value={inputVal} placeholder="Search" className="inputClass mr-5 p-2.5 min-w-52 w-52 rounded-full focus:outline-none" onChange={getValue}
          onKeyPress={(ev) => { if (ev.key === "Enter")  {handleClick(ev.key);}}}
          ></input>

          <div className='search-result w-52 min-w-52 left-0 absolute mt-7 rounded bg-zinc-800'>
            {result.map((item, index) => (<div key={index} className='search-result-item py-2.5 px-4 border-b border-zinc-200 last:border-0 text-white hover:bg-zinc-700 cursor-pointer' onClick={() => {setPokemonData(pokemonData => ({...pokemonData, name: item.toLowerCase(), info:null}));  setInputVal(''); navigate(`/pokemon/${item.toLowerCase()}`); setResult([]);}}>
              {item}
            </div>))}

            {/* {result.length === 0 && inputVal &&
              <div className='search-result-item py-2.5 px-4 cursor-not-allowed text-white'>
                Pokemon is not found!
              </div>
            } */}
      </div>
        </div>
        

        <div className="searchBtn cursor-pointer text-white p-2 border-2 border-solid bg-violet-800 border-violet-900 rounded-full border" onClick={() => handleClick()}>
            Search
        </div>
      </div>
      
    </div>}
    </>
    
  )
}

export default Input;