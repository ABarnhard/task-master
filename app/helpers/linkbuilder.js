'use strict';

var _ = require('lodash');

exports.sort = function (query, name, text, count){
  var query2 = _.cloneDeep(query);
  switch(name){
    case 'due':
      return makeDue(query2, text);
    case 'completed':
      return makeCom(query2, text);
  }
};

exports.check = function(checked){
  if(checked){
    return '<input type="checkbox" name="completed" value="true" checked>';
  }else{
    return '<input type="checkbox" name="completed" value="true">';
  }
};

exports.makeString = function(query){
  var keys = Object.keys(query);
  //console.log(keys);
  if(!keys.length){return '';}

  var query2 = _.cloneDeep(query);
  var s = '?';
  for(var p in query2){
    if(query.hasOwnProperty(p)){
      s += p + '=' + query[p] + '&';
    }
  }
  //console.log(s);
  return s.substring(0, s.length - 1);
};

exports.makeTags = function(tags, query){
  var links = tags.map(function(tag){
    var s = 'filter=' + tag;
    var keys = Object.keys(query);
    if(keys.indexOf('sortBy') !== -1){
      s += '&sortBy=' + query.sortBy + '&order=' + query.order;
    }
    return makeA(s, tag);
  });
  return links.join(', ');
};

exports.makePages = function(){

};

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
