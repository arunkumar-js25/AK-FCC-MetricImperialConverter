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
  test('return an error on a double-fraction', function () {
		  assert.equal(convertHandler.getNum("2/5/6gal"), 'invalid number');
		});
});