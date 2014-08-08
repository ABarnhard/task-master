'use strict';

var _ = require('lodash');

function linkBuilder(query, name, text, count){
  var query2 = _.cloneDeep(query);
  switch(name){
    case 'due':
      return makeDue(query2, text);
    case 'completed':

      break;
  }
}

module.exports = linkBuilder;

// Helper Functions

function makeDue(query, text){
  var o = (query.order) ? query.order * -1 : 1;
  var url = 'sortBy=due&order=' + o;
  return makeA(url, text);
}

function makeA(qString, text){
  return '<a href="/tasks?' + qString + '">' + text + '</a>';
}
