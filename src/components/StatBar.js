import React from 'react';
import statNameObject from '../statNameObject';

function StatBar({pokeInfo}) {
  let total = 0;
  return (
    <div  className=''>
      <div className="font-bold text-3xl mb-5">Base stats</div>
      {pokeInfo.stats.map((pokemonStatInfo, keyIndex) =>{
        total += pokemonStatInfo.base_stat;
        return(
            <div key={keyIndex} className='flex items-center justify-between'>
                        
              <div className="w-28 flex items-center justify-end">
                <div className="w-20 flex justify-end text-sm text-zinc-500">{`${statNameObject[pokemonStatInfo.stat.name]}`}&nbsp;&nbsp;</div>
                <div className="w-8 flex justify-end ">{`${pokemonStatInfo.base_stat}`}</div>
              </div>
              <div className="w-80 ml-2 bg-gray-200 rounded h-3 dark:bg-zinc-300">
                <div className={`h-3 rounded ${pokemonStatInfo.base_stat <= 60 ? 'bg-orange-600' : (pokemonStatInfo.base_stat > 60 && pokemonStatInfo.base_stat <= 75 ? 'bg-yellow-400' : (pokemonStatInfo.base_stat > 75 && pokemonStatInfo.base_stat <= 120 ? 'bg-lime-500' : (pokemonStatInfo.base_stat > 120 && pokemonStatInfo.base_stat < 150 ? 'bg-green-500' : (pokemonStatInfo.base_stat >= 150 ? 'bg-cyan-600' : '' ))))}`} style={{width: `calc(${pokemonStatInfo.base_stat / 2}% )`}}></div>
              </div>
            </div>
        )
      })}
      <div className='flex items-center justify-between'>
        <div className="w-28 flex items-center justify-end">
          <div className="w-20 flex justify-end text-sm text-zinc-500">Total&nbsp;&nbsp;</div>
          <div className="w-8 flex justify-end font-bold">{total}</div>
        </div>
        <div className='grow'></div>
      </div>
    </div>
  )
}

export default StatBar