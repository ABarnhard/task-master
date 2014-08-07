'use strict';

//var _ = require('lodash');

function linkBuilder(query, name, text){
  return makeA('&test=test', 'test');
}

module.exports = linkBuilder;

// Helper Functions
function makeA(qString, text){
  return '<a href="/tasks?' + qString + '">' + text + '</a>';
}
