/* jshint expr: true */
/* global describe, it, before, beforeEach */
'use strict';


var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var Mongo = require('mongodb');
var connect = require('../../app/lib/mongodb');

var p1, p2, p3;
var o1 = {name:'high', color:'#cccccc', value:'5'};
var o2 = {name:'low', color:'#00cccc', value:'3'};
var o3 = {name:'med', color:'#cc00cc', value:'4'};

describe('Priority', function(){
  before(function(done){
    connect('taskmaster-test', function(){
      done();
    });
  });
  beforeEach(function(done){
    Priority.collection.remove(function(){
      p1 = new Priority(o1);
      p2 = new Priority(o2);
      p3 = new Priority(o3);
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            done();
          });
        });
      });
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
  describe('.all', function(){
    it('should return an array of all priorities', function(done){
      Priority.all(function(priorities){
        expect(priorities).to.have.length(3);
        done();
      });
    });
  });
  describe('.findById', function(){
    it('should return the object with that id', function(done){
      Priority.findById(p1._id.toString(), function(priority){
        expect(p1).to.eql(priority);
        expect(priority).to.respondTo('save');
        done();
      });
    });
  });
});
