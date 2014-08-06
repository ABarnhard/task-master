'use strict';

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

module.exports = Priority;

