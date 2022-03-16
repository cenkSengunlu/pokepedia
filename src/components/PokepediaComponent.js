import React, {useState, useEffect} from 'react';


const PokepediaComponent = () => {


  const [inputVal, setInputVal] = useState("");
  const [pokeName, setPokeName] = useState("");
  const [pokeItem, setPokeItem] = useState(null);
  const [pokeForm, setPokeForm] = useState([]);
  const [pokeEvo, setPokeEvo] = useState(null);
  const [title, setTitle] = useState("Poképedia");




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
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}/`);
      const data = await response.json();
      if(!data){
        alert("Error");
        return;
      }
      setPokeItem(data);
      console.log(data);
      setTitle(`${makeUpper(data.name)} | Poképedia`);
    }
    getPokeData();
  }, [pokeName]);

  useEffect(() => {
    if(!pokeItem){
      return;
    }
    async function getPokemonEvolutions() {
      const response = await fetch(pokeItem.evolution_chain.url);
      const data = await response.json();
      console.log(data);
      setPokeEvo(data);
    }

    getPokemonEvolutions();

    

  }, [pokeItem]);


  // useEffect(() => {
  //   if(!pokeItem){
  //     return;
  //   }

  //   async function getPokemonMode(){
  //     let arr = [];
  //     for(let i = 0; i < pokeItem.varieties.length; i++){
  //       const response = await fetch(pokeItem.varieties[i].pokemon.url);
  //       const data = await response.json();
  //       console.log(data);
  //       arr.push(data);
  //     }
  //     setPokeForm(arr);
  //     console.log(pokeForm);
  //   }
  //   getPokemonMode();
  // }, [pokeItem]);




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

    setPokeName(inputVal);
    console.log(inputVal);
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
              pokeItem && (
                <>
                  
                  
                  {/* <div className="flex w-96 justify-between mb-24">
                    {pokeForm.map((x, i) => {
                      return(
                        <div className="flex flex-col items-center w-28 text-center" key={i}>
                          <div>
                            <img src={`${x.sprites.front_default}`} alt="" className="w-24 h-24"/>
                          </div>
                          <div key={`${i}`}>{`${makeUpper(x.name)}`}</div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex w-96 justify-between mb-24">
                    {pokeForm.map((x, i) => {
                      return(
                        <div className="flex flex-col items-center w-28 text-center" key={i}>
                          <div>
                            <img src={`${x.sprites.front_default}`} alt="" className="w-24 h-24"/>
                          </div>
                          <div key={`${i}`}>{`${makeUpper(x.name)}`}</div>
                        </div>
                      )
                    })}
                  </div> */}
                </>
              )
            }
          </div>

          


        </div>
      )
}

export default PokepediaComponent;