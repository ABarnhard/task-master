'use strict';

var _ = require('lodash');

exports.pager = function(query, count){
  count = Math.ceil(count / 3);
  var links = '';

  for(var i = 1; i <= count; i++){
    links += '<li>' + exports.url(query, 'page', i, 'Page ' + i) + '</li>';
  }
  return links;
};

exports.url = function(query, key, value, text){
  var q = _.cloneDeep(query);
  q[key] = value;
  return '<a href=/tasks' + exports.queryString(q) + '>' + text + '</a>';
};

exports.sort = function(query, name, display){
  var order = query.order ? query.order * -1 : 1;
  var filter = query.filter || '';
  var link = '<a href="/tasks?filter='+filter+'&sort='+name+'&order='+order+'">'+display+'</a>';
  return link;
};

exports.queryString = function(query){
  var properties = Object.keys(query).map(function(prop){return prop + '=' + query[prop];});
  var s = '?';
  s += properties.join('&');
  return s;
};

exports.tags = function(query, tags){
  var links = tags.map(function(tag){
    return exports.url({}, 'tag', tag, tag);
  });

  return links.join(', ');
};

