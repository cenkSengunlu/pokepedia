import React, {useState, useEffect, useContext} from 'react';
import makeUpper from '../makeUpper';
import typeColorObject from '../typeColorObject';
import InputContext from '../context/InputContext';
import pokeNameFix from '../pokeNameFix';


function Pokedex({typeDex}) {
    const [counter, setCounter] = useState(0);
    const [pokedex, setPokedex] = useState([]);
    const {pokeName, setPokeName} = useContext(InputContext);

    useEffect(() => {
      if(typeDex){
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
            })
            console.log([...pokedex]);
            
        }
        getPokedex();
    }, [counter, typeDex]);




    useEffect(() => {
      if(!typeDex){
        setPokedex([]);
        return;
      }
      

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
                  <div key={index} className={`bg-zinc-200 text-zinc-500 rounded-2xl py-5 px-6 cursor-pointer w-48 ${typeColorObject[item.types[0].type.name].cardBackground} `} onClick={() => setPokeName(item.name)}>
                    <div className='flex justify-center items-center mb-2'>
                      <img className={`max-w-36 max-h-36 w-36 h-36  bg-white p-2 border-2 border-zinc-400 rounded-xl object-scale-down`} src={`https://img.pokemondb.net/artwork/${item.name === 'mimikyu-disguised' ? 'mimikyu' : item.name}.jpg`} onError={({ currentTarget }) => {
                                                                                currentTarget.onerror = null; // prevents looping
                                                                                currentTarget.src = currentTarget.src === 'http://localhost:3000/null' ? 'https://i.pinimg.com/originals/13/9a/19/139a190b930b8efdecfdd5445cae7754.png' : item.sprites.front_default;
                                                                              }} alt={`${item.name}`}/>
                    </div>
                    <div className='font-semibold text-sm'>#{String(item.id).padStart(3, '0')}</div>
                    <div className='text-black font-medium text-2xl mb-3'>
                      {makeUpper(pokeNameFix[item.name] ? pokeNameFix[item.name].replaceAll('-', ' ') : item.name.replaceAll('-', ' '))}
                    </div>
                    <div className='flex'>
                      {item.types.map((typeItem, typeIndex) => {
                        return(
                          <div key={typeIndex} className={`w-fit text-center text-white rounded-md py-0.5 px-2 drop-shadow-xl border-2 border-solid text-shadow mr-2 ${typeColorObject[typeItem.type.name].background} ${typeColorObject[typeItem.type.name].border}`}>{makeUpper(typeItem.type.name)}</div>
                        )
                      })}
                    </div>
                    
                  </div>
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