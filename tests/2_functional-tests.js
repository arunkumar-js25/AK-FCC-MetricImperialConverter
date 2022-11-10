const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Convert a valid input', function (done) {
		  chai.request(server)
      .get('/api/convert')
      .query({input:'10L'})
      .end(function (err, res) {
			  assert.equal(res.status, 200);
			  done();
			});
		});

  test('Convert an invalid input', function (done) {
		  chai.request(server)
      .get('/api/convert')
      .query({input:'32g'})
      .end(function (err, res) {
			  assert.equal(res.status, 200);
			  done();
			});
		});

  test('Convert an invalid number', function (done) {
		  chai.request(server)
      .get('/api/convert')
      .query({input:'3/7.2/4kg'})
      .end(function (err, res) {
			  assert.equal(res.status, 200);
			  done();
			});
		});

  test('Convert an invalid number AND unit ', function (done) {
		  chai.request(server)
      .get('/api/convert')
      .query({input:'3/7.2/4kilomegagram'})
      .end(function (err, res) {
			  assert.equal(res.status, 200);
			  done();
			});
		});

  test('Convert with no number', function (done) {
		  chai.request(server)
      .get('/api/convert')
      .query({input:'kg'})
      .end(function (err, res) {
			  assert.equal(res.status, 200);
			  done();
			});
		});
});
