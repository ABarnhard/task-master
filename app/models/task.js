'use strict';

var _ = require('lodash');
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

Task.update = function(id, obj, cb){
  id = Mongo.ObjectID(id);
  console.log(id);
  var val = (obj.completed) ? true : false;
  Task.collection.update({_id:id}, {$set:{isComplete:val}}, cb);
};

Task.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Task.collection.findOne({_id:id}, function(err,obj){
    cb(reProto(obj));
  });
};

module.exports = Task;

//HELPERS

function reProto(obj){
  return _.create(Task.prototype, obj);
}
