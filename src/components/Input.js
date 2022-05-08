import React, {useState, useContext} from 'react';
import InputContext from '../context/InputContext';

function Input() {
  const {setPokeName} = useContext(InputContext);

  const [inputVal, setInputVal] = useState("");

  const getValue = (val) => { 
    const { value } = val.target;
    const re = /[a-zA-ZüğşçöıÜĞŞİÇÖI 0-9]/;
    if(value === "" || re.test(value)){
      setInputVal(val.target.value);
    }
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

  return (
    <div className="flex justify-start items-center w-96 p-5 bg-gray-700 mb-5">
      <input type="text" value={inputVal} placeholder="Search" className="inputClass mr-5 p-2.5 rounded-full focus:outline-none" onChange={getValue}
      onKeyPress={(ev) => { if (ev.key === "Enter")  {handleClick(ev.key);}}}
      ></input>

      <div className="searchBtn cursor-pointer text-white p-2 border-2 border-solid bg-violet-800 border-violet-900 rounded-full border" onClick={() => handleClick()}>
          Search
      </div>
  </div>
  )
}

export default Input;