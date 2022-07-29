import React, {useContext} from 'react';
import InputContext from '../context/InputContext';
import TypeDexContext from '../context/TypeDexContext';
import PokemonDataContext from '../context/PokemonDataContext';
import DropDownContext from '../context/DropDownContext';
import { NavLink } from 'react-router-dom';


function ErrorPage() {
  const {setPokemonData} = useContext(PokemonDataContext);
  const {setTypeDex, setTitle, setPoke404Error} = useContext(TypeDexContext);
  return (
    <div className='container w-full flex items-center errorPage'>
      <div className='w-5/12 mx-auto flex justify-around'>
        <div>
          <p className='text-4xl font-semibold text-sky-800'>Something's wrong here...</p>
          <p className='text-lg text-sky-700 mt-3'>It looks like the Pokémon you're looking for isn't here.</p>
          <p className='text-lg text-sky-700'>Head back to home or Pokédex.</p>

          <div className='mt-16 flex'>
            <NavLink to='/pokepedia'
              className='text-2xl cursor-pointer select-none border-2 border-sky-900 py-4 px-5 bg-sky-900 text-white font-semibold' 
              onClick={() => {
                setTitle('Poképedia');
                setPoke404Error(false);
                setTypeDex('');

                setPokemonData(pokemonData => ({...pokemonData, id: null, name: null, info: null, form: [], species: null, types: null, typeMatchup: [], evolution: null}));
                // setPokeInfo(null);
                // setPokeName('');
                

              }}
            >
              Home
            </NavLink>

            <NavLink to='/pokedex' 
              className='text-2xl cursor-pointer select-none border-2 border-sky-900 py-4 px-5 text-sky-900 font-semibold ml-5'  
              onClick={() => {
                setTitle("Pokédex | Poképedia");
                setPoke404Error(false);
                setTypeDex('');
                
                setPokemonData(pokemonData => ({...pokemonData, id: null, name: null, info: null, form: [], species: null, types: null, typeMatchup: [], evolution: null}));
                // setPokeInfo(null);
                // setPokeName('');
                
              
              }}
            >
              Pokédex
            </NavLink>
          </div>
        </div>
        <img  className='w-36' src={require('../images/questionMark.png')} alt="QuestionMark" />
      </div>
      
    </div>
  )
}

export default ErrorPage