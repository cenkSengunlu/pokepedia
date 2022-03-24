import React, {useState, useEffect} from 'react';
import typeDefenseObject from '../typeDefenseObject';

const PokepediaComponent = () => {

  // Inputtan gelen değeri tutan state
  const [inputVal, setInputVal] = useState("");

  // Inputtan gelen verinin atandığı state
  const [pokeName, setPokeName] = useState("");

  // Pokemon bilgilerini tutan obje
  const [pokeInfo, setPokeInfo] = useState(null);

  // Pokemon'ların form(mod) bilgilerini tutan obje dizisi
  const [pokeForm, setPokeForm] = useState([]);

  // Seçili Pokemon formunun(mod) bilgilerini tutan obje
  const [pokeFormData, setPokeFormData] = useState(null);

  // Sayfa başlığı değerini tutan state
  const [title, setTitle] = useState("Poképedia");

  // Seçili Pokemon'un pokedex numarasını tutan state
  const [pokeId, setPokeId] = useState();

  // Seçili dropdown list elemanının değerini id değerini tutan state
  const [selects, setSelects] = useState(0);

  // Seçili Pokemon'un formlarının(mod) type bilgilerini tutan obje dizisi
  const [types, setTypes] = useState();

  // Pokemon'ların type hasar etkileşim tablosunu tutan obje
  const [typeMatchup, setTypeMatchup] = useState([]);





  const getValue = (val) => { 
    const { value } = val.target;
    const re = /[a-zA-ZüğşçöıÜĞŞİÇÖI 0-9]/;
    if(value === "" || re.test(value)){
      setInputVal(val.target.value);
    }
  }

  // Get Pokemon Default Info
  useEffect(() => { 
    if(!pokeName){
      return;
    }

    async function getPokeData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`);
      const data = await response.json();

      const response2 = await fetch(`${data.species.url}`);
      const data2 = await response2.json();

      setPokeInfo(data);
      setPokeFormData(data2);
      setPokeId(data.id);
      setSelects(0);
      // console.log(data);
      // console.log(data2);
      setTitle(`${makeUpper(data.name)} | Poképedia`);
    }
    getPokeData();
  }, [pokeName]);



  // useEffect(() => {
  //   if(!pokeItem){
  //     return;
  //   }
  //   async function getPokemonEvolutions() {
  //     const response = await fetch(pokeItem.evolution_chain.url);
  //     const data = await response.json();
  //     console.log(data);
  //     setPokeEvo(data);
  //   }

  //   getPokemonEvolutions();

    

  // }, [pokeItem]);


  useEffect(() => {
    if(!pokeFormData){
      return;
    }
    // console.log(pokeFormData);
    async function getPokemonMode(){
      let formArr = [];
      let typeArr = [];
      let formTypes = {};

      for(let i = 0; i < pokeFormData.varieties.length; i++){
        const response = await fetch(pokeFormData.varieties[i].pokemon.url);
        const data = await response.json();
        formArr.push(data);
      }
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
        // console.log(formTypes['type' + j]);
      }
      setTypes(formTypes);
    }
    getPokemonMode();
  }, [pokeFormData]);










  useEffect(() => {
    if(!types){
      return;
    }
    let damageCalc = []
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
          }
        }
      }
      
    }
    
    console.log(typeObj);
    let arr = [];


    for (const [key, value] of Object.entries(typeObj)) {
      arr.push(
        <div className="flex flex-col w-10">
          <div className="flex justify-center w-10">{key.toUpperCase().substring(0,3)}</div>
          <div className="flex justify-center w-10">{value}</div>
        </div>
        );
    }

    setTypeMatchup(arr);
  }, [types, selects]);







  const handlePre = (pokeID) => {
    setPokeName(pokeID);
  }

  const handleNext = (pokeID) => {
    setPokeName(pokeID);
  }


  
  useEffect(() =>{
    if(!selects){
      return;
    }
    // console.log(selects);
    // setSelectedOption(selects);
    setPokeInfo(pokeForm[selects]);
  }, [selects]);






  useEffect(() => {
    document.title = title;
  }, [title]);



  const makeUpper = (val) =>{
    val = val.split(" ");
    for(let i = 0; i < val.length; i++){
        let firstLetter = val[i][0];
        let otherVal = val[i].substr(1);
        val[i] = firstLetter.toUpperCase() + otherVal;
    }

    return val.join(" ");
  }

  const handleClick = (ev = '') => {
    if(inputVal.trim() === ''){
      return;
    }

    if(ev === 'Enter'){
      document.querySelector('.inputClass').blur();
    }

    setPokeName(inputVal.toLowerCase());
    // console.log(inputVal);
    setInputVal('');
  }

      return(
        <div className="flex flex-col justify-start items-center w-full h-screen">

          {/* Input */}
          <div className="flex justify-start items-center w-96 p-5 bg-gray-700 mb-5">
            <input type="text" value={inputVal} placeholder="Search" className="inputClass mr-5 p-2.5 rounded-full focus:outline-none" onChange={getValue}
            onKeyPress={(ev) => { if (ev.key === "Enter")  {handleClick(ev.key);}}}
            ></input>
            <div className="searchBtn cursor-pointer" onClick={() => handleClick()}>
                Search
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center">
            {
              pokeInfo && (
                <>
                  {/* Previous - Next Buttons */}
                  <div className="w-96 flex justify-between">
                    <button className={`text-white bg-indigo-700 p-5 rounded-full ${pokeId - 1 ? "visible" : "invisible"}`} onClick={() => handlePre(pokeId - 1)}>{`#${pokeId - 1}`}</button>
                    <button className={`text-white bg-indigo-700 p-5 rounded-full`} onClick={() => handleNext(pokeId + 1)}>{`#${pokeId + 1}`}</button> 
                  </div>
                
                  
                    
                  <div className="flex flex-col items-center w-96 mb-24">
                    <div>
                      <img src={`${pokeInfo.sprites.front_default}`} alt="" className="w-48 h-48"/>
                    </div>
                    <div>{`#${pokeId}`}</div>
                    <div>{`${makeUpper(pokeInfo.name)}`}</div>
                    <div className="w-2/4 flex justify-around">
                      {pokeInfo.types.map((x, i) => {
                        return(
                          <div key={i}>{x.type.name}</div>
                        )
                      })}
                    </div>


                    <div className="">
                      {pokeInfo.stats.map((pokemon, index) => {
                        return(
                          <div key={index}>
                            
                            <div>{`${pokemon.stat.name}: ${pokemon.base_stat}`}</div>
                            <div className="w-64 bg-gray-200 rounded-full h-2.5 dark:bg-indigo-300">
                              <div className="bg-indigo-600 h-2.5 rounded-full" style={{width: `calc(${pokemon.base_stat / 2}% )`}}></div>
                            </div>
                          </div>
                          
                        )
                      })}
                    </div>

                  <select value={selects} onChange={e => setSelects(e.target.value)} className="w-48 mx-10" id="dropList">
                  {
                    pokeForm.map((x, i) => {
                      return(
                        <option key={i} value={i}>{x.name}</option>
                      )
                    })
                  }
                  </select>

                  <div className="w-96 bg-gray-400 flex flex-wrap">
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
          </div>

          


        </div>
      )
}

export default PokepediaComponent;