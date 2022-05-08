import React from 'react';
import makeUpper from '../makeUpper';

function TypeDefense({pokeInfo, typeMatchup}) {
  return (
    <>
    <div>
      <div className="font-bold text-3xl">Type defenses</div>
      <div className="mb-2 mt-4">The effectiveness of each type on <span className="italic">{makeUpper(pokeInfo.name)}</span>.</div>
      <div className="w-96 flex flex-wrap justify-evenly items-center h-44">
        {
          typeMatchup.map((x, i) =>{
            return(
              <div key={i}>{x}</div>
            )
          })
        }
      </div>
    </div>
    </>
  )
}

export default TypeDefense;