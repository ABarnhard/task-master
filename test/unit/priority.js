/* jshint expr: true */
/* global describe, it, before, beforeEach */
'use strict';


var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var Mongo = require('mongodb');
var connect = require('../../app/lib/mongodb');

var p1;

describe('Priority', function(){
  before(function(done){
    connect('taskmaster-test', function(){
      done();
    });
  });
  beforeEach(function(done){
    Priority.collection.remove(function(){
      done();
    });
  });
  describe('constructor', function(){
    it('should create a new priority with proper attributes', function(){
      p1 = new Priority({name:'high', color:'#cccccc', value:'5'  });
      expect(p1).to.be.instanceof(Priority);
      expect(p1.name).to.equal('high');
      expect(p1.color).to.equal('#cccccc');
      expect(p1.value).to.equal(5);
    });
  });
  describe('#save', function(){
    it('should save a priority to the priorities collection', function(done){
      p1 = new Priority({name:'high', color:'#cccccc', value: '10'});
      p1.save(function(){
        expect(p1._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
});
