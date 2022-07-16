import React, {useState, useEffect, useContext} from 'react';
import makeUpper from '../makeUpper';
import PokeCard from './PokeCard';
import TypeDexContext from '../context/TypeDexContext';


function Pokedex({typeDex, paramDex}) {
    const [counter, setCounter] = useState(0);
    const {pokedex, setPokedex} = useContext(TypeDexContext);

    useEffect(() => {
      if(typeDex || paramDex){
        setPokedex([]);
        return;
      }
      
        async function getPokedex(){
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${counter}`);
            const data = await response.json();
            data.results.forEach(async (item) => {
              const response2 = await fetch(item.url);
              const data2 = await response2.json();
              setPokedex(pokedex => [...pokedex, data2]);
            });
            
        }
        getPokedex();
    }, [counter, typeDex]);




    useEffect(() => {
      if(!typeDex  || !paramDex){
        setPokedex([]);
        return;
      }
      console.log(paramDex);
      async function getTypeDex(){
        const response = await fetch(`https://pokeapi.co/api/v2/type/${typeDex}/`);
        const data = await response.json();
        
        data.pokemon.forEach(async (item) => {
          const response2 = await fetch(item.pokemon.url);
          const data2 = await response2.json();
          if(data2.id < 898){
            setPokedex(pokedex => [...pokedex, data2]);
          }
          
        });
        
      }
      getTypeDex();


    }, [typeDex]);


  return (
    <>
      
        
        {pokedex &&
          <>
            {!typeDex && 
              <div className='mb-16 text-6xl font-medium'>Pokédex</div>
            }

            {typeDex && 
              <div className='mb-16 text-6xl font-medium'>{makeUpper(typeDex)} Type Pokémon's</div>
            }

            <div className='grid grid-cols-4 gap-8'>
            
              {pokedex.sort((a, b) => a.id - b.id).map((item, index) => {
                return (
                  <PokeCard pokemon={item} key={index} />
                )
                
              })}
              
            </div>
            {
              !typeDex && 

              <button className='mt-10 px-4 py-2 rounded bg-blue-600 text-white' onClick={() => {
                setCounter(counter + 12);
              }}>Load more Pokémon</button>
            }
            
          </>
        }
        
      
    </>
  )
}

export default Pokedex;