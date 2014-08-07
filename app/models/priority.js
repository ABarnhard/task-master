'use strict';

var _ = require('lodash');
var Mongo = require('mongodb');

function Priority(obj){
  this.name = obj.name;
  this.color = obj.color;
  this.value = obj.value * 1;
}

Object.defineProperty(Priority, 'collection', {
    get: function(){return global.mongodb.collection('priorities');}
});

Priority.prototype.save = function(cb){
  Priority.collection.save(this, cb);
};

Priority.all = function(cb){
  Priority.collection.find().toArray(function(err, objs){
    var priorities = objs.map(function(o){return reProto(o);});
    cb(priorities);
  });
};

Priority.findById = function(id, cb){
  id = (typeof id === 'string') ? Mongo.ObjectID(id) : id;
  Priority.collection.findOne({_id:id}, function(err,obj){
    cb(reProto(obj));
  });
};

module.exports = Priority;



//HELPERS
function reProto(obj){
  return _.create(Priority.prototype, obj);
}
