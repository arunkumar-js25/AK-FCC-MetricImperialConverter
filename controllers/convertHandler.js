const mathjs = require('mathjs');
function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = "1";
    let extraSlash = false;
    for(let i=0;i<input.length;i++){
      if(input[i]!='.' && input[i]!='/' && (input[i] < '0' || input[i]>'9') ){
        break;
      }

      if(extraSlash == false && input[i] == '/'){
        extraSlash = true;
      }
      else if(extraSlash && input[i] == '/'){
        console.error("Double-fraction Error");
      }

      if(input[i] != " ")
      {
        result += input[i];
      }
    }
    return result;
  };
  
  this.getUnit = function(input) {
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
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch(initUnit.toLowerCase()){
      case "gal":
        result = "l";
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
    let result = unitNames[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    let initVal = mathjs.number(mathjs.fraction(initNum));
    console.log(initVal);
    switch(initUnit.toLowerCase()){
      case "gal":
        result = initVal * galToL;
        break;
      case "l":
        result = initVal / galToL;
        break;
      case "km":
        result = initVal / miToKm;
        break;
      case "mi":
        result = initVal * miToKm;
        break;
      case "lbs":
        result = initVal * lbsToKg;
        break;
      case "kg":
        result = initVal / lbsToKg;
        break;
    }
    return Math.round(result*100000)/100000;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = {
                  "initNum":Number(initNum),
                  "initUnit":initUnit,
                  "returnNum":returnNum,
                  "returnUnit":returnUnit,
                  "string":initNum +" "+this.spellOutUnit(initUnit)+" converts to "+returnNum+" "+this.spellOutUnit(returnUnit)
                 };
    return result;
  };
  
}

module.exports = ConvertHandler;
