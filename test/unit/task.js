/* jshint expr: true */
/* global describe, it, before, beforeEach */
'use strict';


var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var Mongo = require('mongodb');
var connect = require('../../app/lib/mongodb');
var Task = require('../../app/models/task');

var p1, p2, p3;
var o1 = {name:'high', color:'#cccccc', value:'5'};
var o2 = {name:'low', color:'#00cccc', value:'3'};
var o3 = {name:'med', color:'#cc00cc', value:'4'};

var t1, t2, t3, t4, t5, t6;

describe('Task', function(){
  before(function(done){
    connect('taskmaster-test', function(){
      done();
    });
  });
  beforeEach(function(done){
    Priority.collection.remove(function(){
      Task.collection.remove(function(){
        p1 = new Priority(o1);
        p2 = new Priority(o2);
        p3 = new Priority(o3);
        p1.save(function(){
          p2.save(function(){
            p3.save(function(){
              var to1 = {name:'get milk', due:'1/1/2014', photo:'http://facebook.com/picture.jpg', tags:'food, home, dairy', priorityId: p1._id.toString()};
              var to2 = {name:'return videotapes', due:'6/1/2014', photo:'http://facebook.com/picture.jpg', tags:'movie, rental, fine', priorityId: p2._id.toString()};
              var to3 = {name:'get gas', due:'2/1/2014', photo:'http://facebook.com/picture.jpg', tags:'car, transport, home', priorityId: p3._id.toString()};
              var to4 = {name:'cook dinner', due:'5/1/2014', photo:'http://facebook.com/picture.jpg', tags:'food, home, meal', priorityId: p1._id.toString()};
              var to5 = {name:'achieve nirvana', due:'4/1/2014', photo:'http://facebook.com/picture.jpg', tags:'life, home, zen', priorityId: p2._id.toString()};
              var to6 = {name:'go nuts!', due:'3/1/2014', photo:'http://facebook.com/picture.jpg', tags:'bar, booze, friends', priorityId: p3._id.toString()};
              t1 = new Task(to1);
              t2 = new Task(to2);
              t3 = new Task(to3);
              t4 = new Task(to4);
              t5 = new Task(to5);
              t6 = new Task(to6);

              t2.isComplete = true;

              t1.save(function(){
                t2.save(function(){
                  t3.save(function(){
                    t4.save(function(){
                      t5.save(function(){
                        t6.save(function(){
                          done();
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
  describe('constructor', function(){
    it('should create a task with proper attributes', function(){
      t1 = new Task({name:'get milk', due:'8/7/2014', photo:'http://facebook.com/picture.jpg', tags:'food, home, dairy', priorityId: p1._id.toString()});
      expect(t1).to.be.instanceof(Task);
      expect(t1.name).to.equal('get milk');
      expect(t1.due).to.respondTo('getDay');
      expect(t1.photo).to.equal('http://facebook.com/picture.jpg');
      expect(t1.tags).to.have.length(3);
      expect(t1.isComplete).to.be.false;
      expect(t1.priorityId).to.be.instanceof(Mongo.ObjectID);
    });
  });
  describe('#save', function(){
    it('should save a task to the database', function(done){
      var task = new Task({name:'get milk', due:'8/7/2014', photo:'http://facebook.com/picture.jpg', tags:'food, home, dairy', priorityId: p1._id.toString()});
      task.save(function(){
        expect(task._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.update', function(){
    it('should set task\'s completed status to true in database', function(done){
      Task.update(t1._id.toString(), {completed:'true'}, function(){
        Task.findById(t1._id.toString(), function(task){
          expect(task.isComplete).to.be.true;
          done();
        });
      });
    });
    it('should set task\'s completed status to false in database', function(done){
      Task.update(t2._id.toString(), {}, function(){
        Task.findById(t2._id.toString(), function(task){
          expect(task.isComplete).to.be.false;
          done();
        });
      });
    });
  });
  describe('.findById', function(){
    it('should find a task in database by it\'s id', function(done){
      Task.findById(t1._id.toString(), function(task){
        expect(task).to.eql(t1);
        expect(task).to.respondTo('save');
        done();
      });
    });
  });
  describe('.count', function(){
    it('should return the # of tasks in the collection', function(done){
      Task.count(function(count){
        expect(count).to.equal(6);
        done();
      });
    });
  });
  describe('.find3', function(){
    it('should return 1st 3 tasks from database', function(done){
      Task.find3({}, function(tasks){
        expect(tasks).to.have.length(3);
        expect(tasks[0].priority.name).to.equal('high');
        done();
      });
    });
  });
});

