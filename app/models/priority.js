'use strict';

var _ = require('lodash');

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

module.exports = Priority;

function reProto(obj){
  return _.create(Priority.prototype, obj);
}
