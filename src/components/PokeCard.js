import React, {useState, useEffect, useContext} from 'react';
import makeUpper from '../makeUpper';
import typeColorObject from '../typeColorObject';
// import InputContext from '../context/InputContext';
import pokeNameFix from '../pokeNameFix';
import { NavLink } from 'react-router-dom';

import PokemonDataContext from '../context/PokemonDataContext';

function PokeCard(pokemon) {
  const {setPokemonData} = useContext(PokemonDataContext);
  // const {setPokeName} = useContext(InputContext);
  const [typeColor, setTypeColor] = useState('');
  const [pokeCardTitle, setPokeCardTitle] = useState('');
  useEffect(() => {
    if(!pokemon){
      return;
    }
    setTypeColor(typeColorObject[pokemon.pokemon.types[0].type.name].cardBackground);
    setPokeCardTitle(makeUpper(pokeNameFix[pokemon.pokemon.name] ? pokeNameFix[pokemon.pokemon.name].replaceAll('-', ' ') : pokemon.pokemon.name.replaceAll('-', ' ')));
  }, [pokemon]);
  
  return (
    <>
      {pokemon && pokeCardTitle && typeColor &&
        <>
          <NavLink to={`/pokemon/${pokemon.pokemon.name}`} className={`bg-zinc-200 shadow-xl text-zinc-500 rounded-2xl py-5 px-6 cursor-pointer select-none w-48 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ${typeColor} `} onClick={() => setPokemonData(pokemonData => ({...pokemonData, name:pokemon.pokemon.name}))}>
            <div className='flex justify-center items-center mb-2'>
              <img className={`max-w-36 max-h-36 w-36 h-36  bg-white p-2 border-2 border-zinc-400 rounded-xl object-scale-down`} src={`https://img.pokemondb.net/artwork/${pokemon.pokemon.name === 'mimikyu-disguised' ? 'mimikyu' : pokemon.pokemon.name}.jpg`} onError={({ currentTarget }) => {
                                                                        currentTarget.onerror = null; // prevents looping
                                                                        currentTarget.src = currentTarget.src === 'http://localhost:3000/null' ? 'https://i.pinimg.com/originals/13/9a/19/139a190b930b8efdecfdd5445cae7754.png' : pokemon.pokemon.sprites.front_default;
                                                                      }} alt={`${pokemon.pokemon.name}`}/>
            </div>
            <div className='font-semibold text-sm'>#{String(pokemon.pokemon.id).padStart(3, '0')}</div>
            <div className='text-black font-medium text-2xl mb-3'>
              {pokeCardTitle}
            </div>
            <div className='flex'>
              {pokemon.pokemon.types.map((typeItem, typeIndex) => {
                return(
                  <div key={typeIndex} className={`w-fit text-center text-white rounded-md py-0.5 px-2 drop-shadow-xl border-2 border-solid text-shadow mr-2  ${typeColorObject[typeItem.type.name].background} ${typeColorObject[typeItem.type.name].border}`}>{makeUpper(typeItem.type.name)}</div>
                )
              })}
            </div>
            
          </NavLink>
        </>
      }
    </>
  )
}

export default PokeCard