const makeUpper = (val) =>{
  val = val.split(" ");
  for(let i = 0; i < val.length; i++){
      let firstLetter = val[i][0];
      let otherVal = val[i].substr(1);
      val[i] = firstLetter.toUpperCase() + otherVal;
  }

  return val.join(" ");
}

export default makeUpper;