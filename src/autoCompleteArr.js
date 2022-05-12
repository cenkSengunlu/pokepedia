import pokeNameFix from './pokeNameFix';
import makeUpper from './makeUpper';
let autoCompleteArr = [];

async function getPokeNames(){
    
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=898&offset=0');
    const data = await response.json();
    data.results.forEach((item) => {
        autoCompleteArr.push(makeUpper(pokeNameFix[item.name] ? pokeNameFix[item.name].replaceAll('-', ' ') : item.name.replaceAll('-', ' ')));
    })

}
getPokeNames();

export default autoCompleteArr; 
