import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import TypeDexContext from '../context/TypeDexContext';

function HomePage() {
  const {setTitle} = useContext(TypeDexContext);

  return (
    <div className='container mx-auto w-full'>
      <img  className='w-2/4 mx-auto' src={require('../images/logo.png')} alt="Logo" />

      <div>
        <p className='text-center mt-12 font-semibold text-3xl'>What is Poképedia?</p>

        <ul className='w-fit list-disc mt-2 mx-auto firstList'>
          <li className='w-fit text-lg'>Poképedia will show you the information of all Pokémon.</li>
          <li className='w-fit text-lg'>This informations includes Pokémon modes, stats, type matchups, evolution chart and Pokédex data.</li>
          <li className='w-fit text-lg'>You can access the Pokédex with all the Pokémon.</li>
          <li className='w-fit text-lg'>You can list Pokémon's by type.</li>
          <li className='w-fit text-lg'>You can search Pokémon's with name or Pokédex number.</li>
          <li className='w-fit text-lg'>You can share your favorite Pokémon with your friends. (If you have one)</li>
          <li className='w-fit text-lg'>Explore the app by going to <NavLink to='/pokedex' className='font-semibold linkColor' onClick={() => setTitle("Pokédex | Poképedia")}>Pokédex</NavLink> or searching for the Pokémon you want.</li>
        </ul>        
      </div>


      <div>
        <p className='text-center mt-14 font-semibold text-3xl'>About this Project:</p>

        <ul className='w-fit list-disc mt-2 mx-auto secondList'>
          <li className='w-fit text-lg'>I develop this web application using <a href='https://pokeapi.co' target='_blank' className='font-semibold linkColor'>PokéAPI</a>.</li>
          <li className='w-fit text-lg'>I'm using Tailwind CSS for design.</li>
          <li className='w-fit text-lg'>I used Context API for communication between components.</li>
          <li className='w-fit text-lg'>Also this project is currently in beta.</li>
        </ul>

        <p className='text-center mt-8 text-xl'>You can view my other projects at my GitHub profile | <a href='https://github.com/cenkSengunlu' target='_blank' className='font-semibold linkColor'>Cenk Şengünlü</a></p>
      </div>
      
      
      
    </div>
  )
}

export default HomePage;