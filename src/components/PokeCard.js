import React from 'react';
import typeColorObject from '../typeColorObject';
import makeUpper from '../makeUpper';

import StatBar from './StatBar';
import TypeDefense from './TypeDefense';

function PokeCard({pokeInfo, pokeSpeciesData, pokeId, typeMatchup}) {
  return (
    <>
    {pokeInfo && pokeSpeciesData && pokeId && typeMatchup &&
      <div className='grid grid-cols-3 gap-8 mt-20  p-5 '>
      {/* #1 */}
      <div className='w-96 h-64 flex justify-center '>
        <img src={`https://img.pokemondb.net/artwork/${pokeInfo.name}.jpg`} onError={({ currentTarget }) => {
                                                                              currentTarget.onerror = null; // prevents looping
                                                                              console.log(currentTarget.src);
      
                                                                              currentTarget.src = currentTarget.src === 'http://localhost:3000/null' ? 'https://i.pinimg.com/originals/13/9a/19/139a190b930b8efdecfdd5445cae7754.png' : pokeInfo.sprites.front_default;
                                                                              // currentTarget.src=pokeInfo.sprites.front_default;
                                                                            }} alt={`${pokeInfo.name}`}/>
      </div>
                                                                          
      {/* #2 */}
      <div className='flex flex-col'>
        <div className="font-bold text-3xl mb-5">Pokédex data</div>
                                                                          
        <div className="w-full flex items-center justify-start mb-2">
          <div className="w-28 flex justify-end text-md text-zinc-500 text-sm">Name&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div className="text-lg font-semibold">{makeUpper(pokeInfo.name.replaceAll('-', ' '))}</div>
        </div>
                                                                          
        <hr/>
                                                                          
        <div className="w-full flex items-center justify-start my-2">
          <div className="w-28 flex justify-end text-md text-zinc-500 text-sm">National No&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div className="font-bold">#{pokeId}</div>
        </div>
                                                                          
        <hr/>
                                                                          
        <div className="w-full flex items-center justify-start my-2">
          <div className="w-28 flex justify-end text-md text-zinc-500 text-sm">Type&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div className="w-1/3 flex justify-start">
            {pokeInfo.types.map((x, i) => {
              return(
                <div key={i} className={`text-white rounded-lg py-0.5 px-2 drop-shadow-xl border-2 border-solid text-shadow mr-2 ${typeColorObject[x.type.name].background} ${typeColorObject[x.type.name].border}`}>{makeUpper(x.type.name)}</div>
              )
            })}
          </div>
        </div>
          
        <hr/>
          
        <div className="w-full flex items-center justify-start my-2">
          <div className="w-28 flex justify-end text-md text-zinc-500 text-sm">Species&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div>{pokeSpeciesData.genera.filter((x) => x.language.name === 'en')[0].genus}</div>
        </div>
          
        <hr/>
          
        <div className="w-full flex items-center justify-start my-2">
          <div className="w-28 flex justify-end text-md text-zinc-500 text-sm">Height&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div>{(String(pokeInfo.height).slice(0, -1) + '.' + String(pokeInfo.height).slice(-1)).padStart(3, '0')} m</div>
        </div>
          
        <hr/>
          
        <div className="w-full flex items-center justify-start my-2">
          <div className="w-28 flex justify-end text-md text-zinc-500 text-sm">Abilities&nbsp;&nbsp;&nbsp;&nbsp;</div>
          <div>{pokeInfo.abilities.map((item, keyIndex) => {
            return(
              <div key={keyIndex} className='flex'>
                <div className={`${item.is_hidden ? `text-sm  text-zinc-500 ` : ''}`}>{!item.is_hidden ? `${keyIndex + 1}. ` : ''}{makeUpper(item.ability.name.replaceAll('-', ' '))}&nbsp;</div>
                <div className='text-sm  text-zinc-500'>{item.is_hidden ? '(hidden ability)' : ''}</div>
              </div>
            )
          })}</div>
        </div>

        <hr/>

        {pokeSpeciesData.pokedex_numbers[1] && 
          <>
            <div className="w-full flex items-center justify-start my-2">
              <div className="w-28 flex justify-end text-md text-zinc-500 text-sm">Local No&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div className='flex'>
                <div className="font-bold">{String(pokeSpeciesData.pokedex_numbers[1].entry_number).padStart(3, '0')}</div>
                <div className='text-zinc-500 text-sm flex items-center'>&nbsp;({makeUpper((pokeSpeciesData.pokedex_numbers[1].pokedex.name).replaceAll('-', ' '))})</div>
              </div>
            </div>
          </>
        }
          
          
          
      </div>    
          
      {/* #3 */}
      <div className='flex flex-col'>
        <div>
          <div className="font-bold text-3xl mb-5">Training</div>
        </div>
          
        <div>
          <div className="font-bold text-3xl mb-5">Breeding</div>
        </div>
        </div>   

        {/* #4*/}
        <div>
          <div className="">
            <div className="font-bold text-3xl mb-5">Mode select</div>
          </div>
        </div>


        {/* #5 */}
        <div>
          <StatBar pokeInfo={pokeInfo}/>
        </div>

        {/* #6 */}
        <div>
          <TypeDefense pokeInfo={pokeInfo} typeMatchup={typeMatchup}/>
        </div>



      </div>
    }
    </>
  )
}

export default PokeCard