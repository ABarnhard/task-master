'use strict';

//var _ = require('lodash');
var Mongo = require('mongodb');

Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('tasks');}
});

function Task(obj){
  this.name = obj.name;
  this.due = new Date(obj.due);
  this.photo = obj.photo;
  this.tags = obj.tags.split(',').map(function(s){return s.trim();});
  this.priorityId = Mongo.ObjectID(obj.priorityId);
  this.isComplete = false;
}

Task.prototype.save = function(cb){
  Task.collection.save( this, cb);
};

Task.count = function(cb){
  Task.collection.count(function(err, count){
    cb(count);
  });
};

module.exports = Task;

