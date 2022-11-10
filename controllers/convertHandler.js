const mathjs = require('mathjs');
function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = "";
    let extraSlash = false;
    for(let i=0;i<input.length;i++){
      if(input[i]!='.' && input[i]!='/' && (input[i] < '0' || input[i]>'9') ){
        break;
      }

      if(extraSlash == false && input[i] == '/'){
        extraSlash = true;
      }
      else if(extraSlash && input[i] == '/'){
        //console.error("Double-fraction Error");
        return "invalid number";
      }

      if(input[i] != " ")
      {
        result += input[i];
      }
    }

    if(extraSlash){
      val = result.split('/');
      //console.log(val);
      return val[0]/val[1];
    }
    else if(result == ""){
      result = "1";
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let unitsAvailable = ['gal','l','L','lbs','kg','km','mi'];
    let result = "";
    let startUnit = false;
     for(let i=0;i<input.length;i++){
      if(input[i] < 'A' || input[i]>'z'){
        if(startUnit)
        {
          break;
        }
      }
      else{
         startUnit = true;
      }

      if(startUnit){
        result += input[i];
      }
    }
    
    if(result == "l" || result == "L"){
      result = "L";
    }
    else{
      result = result.toLowerCase();
    }

    if( unitsAvailable.indexOf(result) == -1 ){
      return "invalid unit";
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit.toLowerCase()){
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "km":
        result = "mi";
        break;
      case "mi":
        result = "km";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    
    let unitNames = { "km" : "kilometers", "mi" : "miles",
                    "gal": "gallons", "l":"litres",
                    "kg":"kilograms", "lbs":"pounds"};
    let result = unitNames[unit.toLowerCase()];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit.toLowerCase()){
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
    }
    return Math.round(result*100000)/100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = {
                  "initNum":Number(initNum),
                  "initUnit": initUnit,
                  "returnNum":returnNum,
                  "returnUnit":returnUnit,
                  "string":initNum +" "+this.spellOutUnit(initUnit)+" converts to "+returnNum+" "+this.spellOutUnit(returnUnit)
                 };
    return result;
  };
  
}

module.exports = ConvertHandler;
