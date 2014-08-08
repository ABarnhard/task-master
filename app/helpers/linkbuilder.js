'use strict';

var _ = require('lodash');

function linkBuilder(query, name, text, count){
  var query2 = _.cloneDeep(query);
  switch(name){
    case 'due':
      return makeDue(query2, text);
    case 'completed':
      return makeCom(query2, text);
  }
}

module.exports = linkBuilder;

// Helper Functions

function makeDue(query, text){
  var reString = '';
  var o = (query.order) ? query.order * -1 : 1;
  for(var p in query){
    if(query.hasOwnProperty(p)){
      if(p === 'page' || p === 'filter'){
        reString += '&' + p + '=' + query[p];
      }
    }
  }
  console.log(reString);
  var s = 'sortBy=due&order=' + o + reString;
  return makeA(s, text);
}

function makeCom(query, text){
  var reString = '';
  var o = (query.order) ? query.order * -1 : 1;
  for(var p in query){
    if(query.hasOwnProperty(p)){
      if(p === 'page' || p === 'filter'){
        reString += '&' + p + '=' + query[p];
      }
    }
  }
  console.log(reString);
  var s = 'sortBy=isComplete&order=' + o + reString;
  return makeA(s, text);
}

function makeA(qString, text){
  return '<a href="/tasks?' + qString + '">' + text + '</a>';
}
