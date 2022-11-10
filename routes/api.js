'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req,res)=>{
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    console.log(initNum);
    let initUnit = convertHandler.getUnit(input);
    console.log(initUnit);

    if(initNum == "invalid number" && initUnit!="invalid unit"){
       res.send("invalid number");
    }
    else if(initNum != "invalid number" && initUnit=="invalid unit"){
       res.send("invalid unit");
    }
    else if(initNum == "invalid number" && initUnit=="invalid unit"){
       res.send("invalid number and unit");
    }
    else{
      let returnNum = convertHandler.convert(initNum,initUnit);
      console.log(returnNum);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      console.log(returnUnit);
      let stringOp=convertHandler.getString(initNum,initUnit,returnNum,returnUnit)
      res.json(stringOp);
    }
    
    
  });
  
  
};
