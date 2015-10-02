'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var Poll = require('./poll.model');

var poll;

describe('Poll Model', function() {
  before(function(done) {
    Poll.remove().exec().then(function() {
      done();
    });
  });

  beforeEach(function(done) {
    poll = new Poll({
      title: 'The Greatest Poll Ever',
      //author: 'welvindagreat', // does not cast to objectId
      authorname: 'welvindagreat',
      desc: 'Because I said so.',
      date: Date.now()
    });
    done();
  });

  afterEach(function(done) {
    Poll.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no polls', function(done) {
    Poll.find({}, function(err, polls) {
      polls.should.have.length(0);
      done();
    });
  });

  it('should fail when saving without a title', function(done) {
    poll.title = '';
    poll.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should fail when saving with an empty array of questions', function(done) {
    poll.questions = [];
    poll.save(function(err) {
      should.exist(err);
      done();
    });
  });

  it('should pass if there is at least one question', function(done) {
    poll.questions = ['question'];
    poll.save(function(err) {
      Poll.find({}, function(err, polls) {
        polls.should.have.length(1);
        done();
      });
    });
  });  

});

describe('GET /api/polls', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/polls')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});