import React, {useContext, useState, useEffect} from 'react';
import InputContext from '../context/InputContext';
import makeUpper from '../makeUpper';
import pokeNameFix from '../pokeNameFix';


function PreviousAndNext({pokeInfo, pokeId}) {

  
  const {setPokeName} = useContext(InputContext);
  const [previous, setPrevious] = useState();
  const [next, setNext] = useState();
  
  useEffect(() => {
    if(!pokeId){
      return;
    }

    async function preNext() {
      if(pokeInfo.id !== 1){
        const responsePre = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId - 1}/`);
        const dataPre = await responsePre.json();
        setPrevious(dataPre);
      } else{
        setPrevious(pokeInfo);
      }

      if(pokeInfo.id !== 898){
        const responseNext = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId + 1}/`);
        const dataNext = await responseNext.json();
        setNext(dataNext);
      } else{
        setNext(pokeInfo);
      }
    };

    preNext();

  }, [pokeId, pokeInfo]);



  

  const handlePre = (pokeID) => {
    setPokeName(pokeID);
  }

  const handleNext = (pokeID) => {
    setPokeName(pokeID);
  }

  return (
    <>
    { previous && next && 
      <div className="grid grid-cols-3 gap-8">
        <button className={`preBtn text-white py-3 px-5 w-64 rounded-full flex justify-around items-center justify-center col-start-1 ${pokeId - 1 ? "visible" : "invisible"}`} onClick={() => handlePre(pokeId - 1)}><div>◂</div><img className='w-12 h-12' src={previous.sprites.front_default} alt={makeUpper(previous.name)} />{`#${previous.id}: ${makeUpper(pokeNameFix[previous.name] ? pokeNameFix[previous.name].replaceAll('-', ' ') : previous.name.replaceAll('-', ' '))}`}</button> 
        <button className={`nextBtn text-white py-3 px-5 w-64 rounded-full flex justify-around items-center justify-center col-start-3 ${pokeId + 1 !== 899  ? "visible" : "invisible"}`} onClick={() => handleNext(pokeId + 1)}>{`#${next.id}:  ${makeUpper(pokeNameFix[next.name] ? pokeNameFix[next.name].replaceAll('-', ' ') : next.name.replaceAll('-', ' '))}`}<img className='w-12 h-12' src={next.sprites.front_default} alt={makeUpper(next.name)} /><div>▸</div></button> 
      </div>
    }
      
    </>

  )
}

export default PreviousAndNext;