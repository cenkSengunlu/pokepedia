import React, {useState, useEffect, useContext} from 'react';
import typeDefenseObject from '../typeDefenseObject';
import typeColorObject from '../typeColorObject';
import damageColorObject from '../damageColorObject';
import InputContext from '../context/InputContext';
import DropDownContext from '../context/DropDownContext';
import TypeDexContext from '../context/TypeDexContext';
import Input from './Input';
import PokeInfoPage from './PokeInfoPage';
import Pokedex from './Pokedex';
import PreviousAndNext from './PreviousAndNext';
import makeUpper from '../makeUpper';
import whiteList from '../whiteList';
import pokeNameFix from '../pokeNameFix';


const PokepediaComponent = () => {

  // Pokemonların tüm bilgilerini tutan test objesi
  const [testInfo, setTestInfo] = useState({});
  

  // Inputtan gelen verinin atandığı state
  const {pokeName} = useContext(InputContext);

  // Pokedex'i seçili type'a göre filtrelemek için type bilgisini tutan state
  const {typeDex} = useContext(TypeDexContext);

  // Pokemon bilgilerini tutan obje
  const {pokeInfo, setPokeInfo} = useContext(DropDownContext);

  // Pokemon'ların form(mod) bilgilerini tutan obje dizisi
  const [pokeForm, setPokeForm] = useState([]);

  // Seçili Pokemon'un tür bilgilerini tutan obje
  const [pokeSpeciesData, setPokeSpeciesData] = useState(null);

  // Sayfa başlığı değerini tutan state
  const {title, setTitle} = useContext(TypeDexContext);

  // Seçili Pokemon'un pokedex numarasını tutan state
  const [pokeId, setPokeId] = useState();

  // Seçili dropdown list elemanının değerini id değerini tutan state
  const {selects, setSelects} = useContext(DropDownContext);

  // Seçili Pokemon'un formlarının(mod) type bilgilerini tutan obje dizisi
  const [types, setTypes] = useState();

  // Pokemon'ların type hasar etkileşim tablosunu tutan obje
  const [typeMatchup, setTypeMatchup] = useState([]);




  // Aranan Pokemon eğer varsa genel bilgilerini ve Tür bilgilerini fetch et
  useEffect(() => { 
    if(!pokeName){
      return;
    }
    // setLoading(false);
    async function getPokeData() {
      // Genel Bilgisi
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${whiteList[pokeName] ? whiteList[pokeName] : pokeName}/`);
      const data = await response.json();

      // Tür Bilgisi
      const response2 = await fetch(data.species.url);
      const data2 = await response2.json();
      setSelects(0);

      // Pokemon'un genel bilgisini set et
      setPokeInfo(data);
      // Pokemon'un tür bilgisini set et
      setPokeSpeciesData(data2);

      // Aranan/Seçilen Pokemon'un Pokedex numarasını set et
      setPokeId(data.id);

      // Mod isimlerini listeleyen dropdown list'in seçili eleman numarasını set et
      
      console.log(data);
      console.log(data2);

      // Site başlığını set et
      setTitle(`${makeUpper(pokeNameFix[data.name] ? pokeNameFix[data.name].replaceAll('-', ' ') : data.name.replaceAll('-', ' '))} | Poképedia`);
    }
    // setPromise2(getPokeData);
    getPokeData();
  }, [pokeName]);



  // Aranan/Seçilen Pokemon'un evrim ağacını fetch et
  // useEffect(() => {
  //   if(!pokeId || !pokeSpeciesData){
  //     return;
  //   }
    
  //   async function getPokemonEvolutions() {
  //     // Aranan/Seçilen Pokemon'un evrim ağacı bilgisi
  //     const response = await fetch(pokeSpeciesData.evolution_chain.url);
  //     const data = await response.json();
  //     console.log(data);
  //     // setPokeEvo(data);

  //     // Evrim ağacını her bir evrim için dizi olarak tutacak obje
  //     let evolutionObj = {};

  //     // Evrim ağacında içeriye doğru gitmek için gereken yol
  //     let evolutionChain = data.chain.evolves_to;

  //     // Evrim ağacı objesinin ilk elemanı
  //     evolutionObj[`evo${Object.keys(evolutionObj).length + 1}`] = [data.chain.species.url];
  //     // console.log(data2.chain.species.url);

  //     // Feth ettiğimiz objede bir üst evrimi alabilmek için döngü (recursive mantığını anladığımda recursive ile yapacağım)
  //     while(evolutionChain.length) {
  //       evolutionObj[`evo${Object.keys(evolutionObj).length + 1}`] = [];

  //       // Bazı pokemonlar birden çok pokemona evrimleşebildiği için gelen arrayi mapleyerek mevcut key'in değeri olan diziye yeni eleman ekliyorum
  //       evolutionChain.forEach((x) => {
  //         evolutionObj[`evo${Object.keys(evolutionObj).length}`].push(x.species.url);
  //         // console.log(x.species.url);
  //       });
  //       // Bir üst evrime geç
  //       evolutionChain = evolutionChain[0].evolves_to;
  //     }
  //     console.log(evolutionObj);
  //   }
  //   // setPromise3(getPokemonEvolutions);
  //   getPokemonEvolutions();
  // }, [pokeId, pokeSpeciesData]);


  // Aranan/Seçilen Pokemon'un Form(Mod) bilgilerini fetch et
  useEffect(() => {
    if(!pokeSpeciesData){
      return;
    }
    // console.log(pokeFormData);
    async function getPokemonMode(){
      // Pokemon'un varolan formlarını(modlarını) tutacak olan dizi
      let formArr = [];

      // formTypes objesinin dinamik olarak oluşan keylerine değer olarak atanacak, type(tür) bilgilerini tutacak dizi
      let typeArr = [];
      // Pokemon'un varolan formlarının tip(type) bilgilerini tutacak obje
      let formTypes = {};

      // Pokemon'un form(mod) bilgilerini döngü ile feth et
      for(let i = 0; i < pokeSpeciesData.varieties.length; i++){
        const response = await fetch(pokeSpeciesData.varieties[i].pokemon.url);
        const data = await response.json();
        formArr.push(data);
      }
      // Form bilgilerini set et
      setPokeForm(formArr);
      // console.log(formArr);
      
      for(let j = 0; j < formArr.length; j++){
        typeArr = [];
        for(let p = 0; p < formArr[j].types.length; p++){
          const response2 = await fetch(formArr[j].types[p].type.url);
          const data2 = await response2.json();
          typeArr.push(data2);
        }
        formTypes['type' + j] = typeArr;
        console.log(formTypes['type' + j]);
      }
      // Form tiplerini tutan objeyi set et
      console.log(formTypes);
      setTypes(formTypes);
    }
    getPokemonMode();
  }, [pokeSpeciesData]);









  // Pokemon type hasar hesabı
  useEffect(() => {
    if(!types){
      return;
    }
    const damageCalculate = () => {
      const formType = types['type' + selects];
      // console.log(formType);
      let typeObj = {...typeDefenseObject};
      const damageControl = Object.keys(formType[0].damage_relations).filter((o) => o.includes('from')); 
      // console.log(damageControl);
      // console.log(types['type' + selectedOption])
      let damageType;
  
      for(let i = 0; i < formType.length; i++){
        for(let j = 0; j < damageControl.length; j++){
          for(let p = 0; p < formType[i].damage_relations[damageControl[j]].length; p++){
            damageType = formType[i].damage_relations[damageControl[j]][p].name;
            switch(damageControl[j]){
              case 'double_damage_from': {
                typeObj[damageType] *= 2;
                break;
              }
              case 'half_damage_from': {
                typeObj[damageType] *= 0.5;
                break;
              }
              case 'no_damage_from': {
                typeObj[damageType] *= 0;
                break;
              }
              default: {
                break;
              }
            }
          }
        }
        
      }
      
      // console.log(typeObj);
      let arr = [];
  
  
      for (const [key, value] of Object.entries(typeObj)) {
  
        arr.push(
          <div className="flex flex-col w-10 ">
            <div className={`flex justify-center items-center w-10 py-2 border-2 border-solid rounded-lg text-white text-sm font-medium mb-0.5 drop-shadow-md text-shadow ${typeColorObject[key].background} ${typeColorObject[key].border}`}>{key.toUpperCase().substring(0,3)}</div>
            <div className={`flex justify-center items-center w-10 h-10 py-2 text-yellow-300 rounded-lg text-sm ${damageColorObject[value]}`}>{damageValueReplace(value)}</div>
          </div>
          );
      }
      setTypeMatchup(arr);
    }
    // setPromise5(damageCalculate);
    damageCalculate();

  }, [types, selects]);

  // Promise.all([promise2, promise3, promise4, promise5]).then(() => {
  //   setLoading(true);
  // });


  const damageValueReplace = (val) => {
    switch (val) {
      case 1: {
        return '';
      }
      case 0.5: {
        return '½';
      }
      case 0.25: {
        return '¼';
      }
      default: {
        return val;
      }
    }
  }





  // Dropdown listteki seçilen elemanı ata







  useEffect(() => {
    document.title = title;
  }, [title]);






      return(
        <div className="flex flex-col justify-start items-center w-full h-screen">

          {/* Input */}
          {/* <div className="flex justify-start items-center w-96 p-5 bg-gray-700 mb-5">
            <input type="text" value={inputVal} placeholder="Search" className="inputClass mr-5 p-2.5 rounded-full focus:outline-none" onChange={getValue}
            onKeyPress={(ev) => { if (ev.key === "Enter")  {handleClick(ev.key);}}}
            ></input>
            <div className="searchBtn cursor-pointer text-white p-2 border-2 border-solid bg-violet-800 border-violet-900 rounded-full border" onClick={() => handleClick()}>
                Search
            </div>
          </div> */}
          <Input />
          {
            !pokeName && <Pokedex typeDex={typeDex}/>
          }
          

          {/* Content */}
          <div className="flex flex-col items-center">
            {
              pokeInfo && pokeName &&
                <>
                  {/* Previous - Next Buttons */}
                  <PreviousAndNext pokeInfo={pokeInfo} pokeId={pokeId} />
                
                  <PokeInfoPage pokeInfo={pokeInfo} pokeForm={pokeForm} pokeSpeciesData={pokeSpeciesData} pokeId={pokeId} typeMatchup={typeMatchup}/>
                    
                </>
            }
          </div>

          


        </div>
      )
}

export default PokepediaComponent;