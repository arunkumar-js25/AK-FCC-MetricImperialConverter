const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('read a whole number input', function () {
		  assert.equal(convertHandler.getNum("1gal"), '1');
		});
  test('read a decimal number input', function () {
		  assert.equal(convertHandler.getNum("1.1gal"), '1.1');
		});
  test('read a fractional input', function () {
		  assert.equal(convertHandler.getNum("2/5gal"), '0.4');
		});
  test('read a fractional input', function () {
		  assert.equal(convertHandler.getNum("2.3/5gal"), '0.45999999999999996');
		});
  test('return an error on a double-fraction', function () {
		  assert.equal(convertHandler.getNum("2/5/6gal"), 'invalid number');
		});
  test('default to a numerical input of 1', function () {
		  assert.equal(convertHandler.getNum(""), '1');
		});
  test('read each valid input unit', function () {
		  assert.equal(convertHandler.getUnit("1l"), 'L');
		});
  test('return an error for an invalid input unit', function () {
		  assert.equal(convertHandler.getUnit("1le"), 'invalid unit');
		});
  test('correct return unit for each valid input unit', function () {
		  assert.equal(convertHandler.getReturnUnit("L"), 'gal');
		});

  test('spelled-out string unit for each valid input unit', function () {
		  assert.equal(convertHandler.spellOutUnit("L"), 'litres');
		});

  //GAL TO L
  test('gal to L', function () {
		  assert.equal(convertHandler.convert("10","gal"), 37.8541);
		});
  test('L to gal', function () {
		  assert.equal(convertHandler.convert("37.8541","L"), 10);
		});

  //KM TO MI
  test('mi to km', function () {
		  assert.equal(convertHandler.convert("10","mi"), 16.0934);
		});
  test('km to mi', function () {
		  assert.equal(convertHandler.convert("16.0934","km"), 10);
		});

  //lbs TO kg
  test('lbs to kg', function () {
		  assert.equal(convertHandler.convert("10","lbs"), 4.53592);
		});
  test('kg to lbs', function () {
		  assert.equal(convertHandler.convert("4.53592","kg"), 10);
		});
});