var expect = require('chai').expect;
var app = require('../main');
var request = require('supertest');

var token = null;
var userid = null;

describe('Signup API', function() {
    it('Should be successfull if correct username is provided', function(done) {
        request(app)
           .post('/api/auth/signup')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ userName: 'admin123', password: 'Password1' })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 
});

describe('Login API', function() {
    it('Should be successfull if credential is valid', function(done) {
        request(app)
           .post('/api/auth/login')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ userName: 'admin1', password: 'Password1' })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              token = response.body.data.jwtToken;
              userid = response.body.data.userDetails._id;
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 
});

describe('Token Generation API', function() {
    it('Should be successfull if authenticated user has logged in to generate invitation token', function(done) {
        request(app)
           .get('/api/token/gen')
           .set('authorization',token)
           .set('Content-Type', 'application/json')
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body.data).not.to.be.undefined;
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 
});

describe('Token View API', function() {
    it('Should be successfull if authenticated user has a set of tokens', function(done) {
        request(app)
           .get('/api/token/getToken/'+userid)
           .set('authorization',token)
           .set('Content-Type', 'application/json')
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body.data.tokens).not.to.be.empty;
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 
});

describe('Valid Token API', function() {
    it('Should be successfull if token is valid', function(done) {
        request(app)
           .post('/api/token/check')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .send({ token: 'ZJNFGOJS10' })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body.data.tokens).not.to.be.null;
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
           })
           .end(done);
    }); 
});