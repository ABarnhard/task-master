'use strict';

var Task = require('../models/task');
var Priority = require('../models/priority');

exports.index = function(req, res){
  Task.find3(req.query, function(tasks){
    res.render('tasks/index', {tasks:tasks});
  });
};

exports.init = function(req, res){
  Priority.all(function(priorities){
    res.render('tasks/new', {priorities:priorities});
  });
};

exports.create = function(req, res){
  var t = new Task(req.body);
  t.save(function(){
    res.redirect('/tasks');
  });
};

