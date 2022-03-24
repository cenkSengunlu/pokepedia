// import React, {useState} from 'react';

// const InputComponent = (value) => {

//   const [inputVal, setInputVal] = useState('');
//   // const [pokeName, setPokeName] = useState('');

//   const getValue = (val) => { 
//     const { value } = val.target;
//     const re = /[a-zA-ZüğşçöıÜĞŞİÇÖI 0-9]/;
//     if(value === "" || re.test(value)){
//       setInputVal(val.target.value);
//     }
//   }

//   const handleClick = (ev = '') => {
//     if(inputVal.trim() === ''){
//       return;
//     }

//     if(ev === 'Enter'){
//       document.querySelector('.inputClass').blur();
//     }

//     value(inputVal.toLowerCase());
//     console.log(inputVal.toLowerCase());
//     setInputVal('');
//   }

//   return (
//     <div className="flex justify-start items-center w-96 p-5 bg-gray-700 mb-5">
//       <input type="text" value={inputVal} placeholder="Search" className="inputClass mr-5 p-2.5 rounded-full focus:outline-none" 
//         onChange={getValue} onKeyPress={(ev) => { if(ev.key === "Enter") {handleClick(ev.key);}}} />
//       <div className="searchBtn cursor-pointer text-white bg-purple-500 rounded-full p-2.5" onClick={() => handleClick()}>Search</div>
//     </div>
//   )
// }

// export default InputComponent;