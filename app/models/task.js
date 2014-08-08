'use strict';

var _ = require('lodash');
var Mongo = require('mongodb');
var async = require('async');
var Priority = require('./priority');

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

Task.count = function(query, cb){
  var filter = {};
  if(query.filter){filter = {tags:{$in:[query.filter]}};}
  Task.collection.count(filter, function(err, count){
    cb(count);
  });
};

Task.update = function(id, obj, cb){
  id = (typeof id === 'string') ? Mongo.ObjectID(id) : id;
  var val = (obj.completed) ? true : false;
  Task.collection.update({_id:id}, {$set:{isComplete:val}}, cb);
};

Task.findById = function(id, cb){
  id = Mongo.ObjectID(id);
  Task.collection.findOne({_id:id}, function(err,obj){
    cb(reProto(obj));
  });
};

Task.find3 = function(query, cb){
  var options = {limit:3}, filter = {};
  if(query.filter){filter = {tags:{$in:[query.filter]}};}
  if(query.sortBy){
    var sort = query.order * 1;
    options.sort = [[query.sortBy,sort]];
  }
  if(query.page){
    options.skip = ((query.page * 1) - 1) * 3;
  }
  console.log(filter, options);
  Task.collection.find(filter, options).toArray(function(err, objs){
    var tasks = objs.map(function(o){return reProto(o);});
    async.map(tasks, function(task, done){
      Priority.findById(task.priorityId, function(priority){
        task.priority = priority;
        done(null, task);
      });
    }, function(err, newTasks){
      //console.log(newTasks);
      cb(newTasks);
    });
  });
};

module.exports = Task;

//HELPERS

function reProto(obj){
  return _.create(Task.prototype, obj);
}
