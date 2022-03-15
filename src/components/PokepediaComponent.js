import React, {useState, useEffect} from 'react';


const PokepediaComponent = () => {


  const [inputVal, setInputVal] = useState("");
  const [pokeName, setPokeName] = useState("");
  const [pokeItem, setPokeItem] = useState(null);

  const [title, setTitle] = useState("Poképedia");




  const getValue = (val) => { 
    const { value } = val.target;
    const re = /[a-zA-ZüğşçöıÜĞŞİÇÖI 0-9]/;
    if(value === "" || re.test(value)){
      setInputVal(val.target.value);
    }
  }

  useEffect(() => { 
    if(!pokeName){
      return;
    }

    async function getPokeData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${pokeName}/`);
      const data = await response.json();
      if(!data){
        alert("Error");
      }
      setPokeItem(data);
      console.log(data);
      setTitle(`${makeUpper(data.name)} | Poképedia`);
    }
    getPokeData();
  }, [pokeName]);

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
          <div className="flex justify-start items-center w-96 p-5 bg-gray-700 block">
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
                  <div>
                    <img src={`${pokeItem.sprites.front_default}`} alt="" />
                  </div>
                  <div>{`${makeUpper(pokeItem.pokemon.name)}`}</div>
                  <div className="flex w-32 justify-around">
                    {pokeItem.types.map((x, i) => {
                      return(
                        <div key={`${i}`}>{`${makeUpper(x.type.name)}`}</div>
                      )
                    })}
                  </div>
                </>
              )
            }
          </div>
          


        </div>
      )
}

export default PokepediaComponent;