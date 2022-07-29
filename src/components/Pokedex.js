import React, {useState, useEffect, useContext} from 'react';
import makeUpper from '../makeUpper';
import PokeCard from './PokeCard';
import TypeDexContext from '../context/TypeDexContext';
import Loading from 'react-simple-loading';
import ErrorPage from './ErrorPage';


function Pokedex({typeDex, paramDex}) {
    const [counter, setCounter] = useState(0);
    const [typeDexLimit, setTypeDexLimit] = useState(12);
    const {pokedex, setPokedex} = useContext(TypeDexContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      if(typeDex || paramDex){
        setPokedex([]);
        return;
      }
      
        async function getPokedex(){
          try{
            setIsLoading(true);
            
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${counter}`);
            const data = await response.json();
            data.results.forEach(async (item) => {
              const response2 = await fetch(item.url);
              const data2 = await response2.json();
              setPokedex(pokedex => [...pokedex, data2]);
            });
            setError(false);
          } catch{
            setError(true);
            console.log('error');
          }
          setIsLoading(false);
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
        try{
          setIsLoading(true);
          const response = await fetch(`https://pokeapi.co/api/v2/type/${typeDex}/`);
          const data = await response.json();
          
          data.pokemon.forEach(async (item) => {
            const response2 = await fetch(item.pokemon.url);
            const data2 = await response2.json();
            if(data2.id < 898){
              setPokedex(pokedex => [...pokedex, data2]);
            }
          });
        } catch{
          setError(true);
        }
      setIsLoading(false);
        
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

            {typeDex && !error && !isLoading &&
              <div className='mb-16 text-6xl font-medium'>{makeUpper(typeDex)} Type Pokémon's</div>
            }

            <div className='grid grid-cols-4 gap-8'>
            
              {!typeDex && pokedex.sort((a, b) => a.id - b.id).map((item, index) => {
                return (
                  <PokeCard pokemon={item} key={index} />
                )
                
              })}

              {typeDex &&
                  pokedex.sort((a, b) => a.id - b.id).map((item, index) => {
                    return (
                      (index < typeDexLimit) &&
                      <PokeCard pokemon={item} key={index} />
                    )
                    
                  }
                )}

              
              
            </div>
            {!isLoading ? (
            ( (typeDex &&(pokedex.length >= typeDexLimit)) || (!typeDex &&(pokedex.length >= counter))) && (
              
              <button className='mt-10 px-4 py-2 rounded bg-indigo-500 text-white select-none' onClick={() => {
                if(!typeDex){
                  setCounter(counter + 12);
                } else{
                  setTypeDexLimit(typeDexLimit + 12);
                }


              }}>Load more Pokémon</button>
              
            )
            ) : (
              <div className='flex items-center'>
                <span className='mt-5 mr-5 text-md font-medium'>Loading</span>  
                <Loading />
              </div>
          )}


            {
              !isLoading && error && 
              <>
                <ErrorPage />
              </>
            }


            
          </>
        }
        
      
    </>
  )
}

export default Pokedex;