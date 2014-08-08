/* jshint expr: true */
/* global describe, it */

'use strict';

var expect = require('chai').expect;
var linkBuilder = require('../../app/helpers/linkbuilder');

describe('linkBuilder', function(){
  describe('Due link', function(){
    it('Should return a link to sort by Due in ascending order', function(){
      var link = linkBuilder.sort({}, 'due', 'Due');
      expect(link).to.equal('<a href="/tasks?sortBy=due&order=1">Due</a>');
    });
    it('Should return a link to sort by Due in descending order', function(){
      var link = linkBuilder.sort({sortBy:'due', order:'1'}, 'due', 'Due');
      expect(link).to.equal('<a href="/tasks?sortBy=due&order=-1">Due</a>');
    });
    it('Should return a link to sort by Due in ascending order filtered by home', function(){
      var link = linkBuilder.sort({filter:'home'}, 'due', 'Due');
      expect(link).to.equal('<a href="/tasks?sortBy=due&order=1&filter=home">Due</a>');
    });
    it('Should return a link to 2nd page sorted by Due in ascending order filtered by home', function(){
      var link = linkBuilder.sort({filter:'home', page:'2'}, 'due', 'Due');
      expect(link).to.equal('<a href="/tasks?sortBy=due&order=1&filter=home&page=2">Due</a>');
    });
  });
  describe('Completed Link', function(){
    it('Should return a link to sort by Completed in ascending order', function(){
      var link = linkBuilder.sort({}, 'completed', 'Completed');
      expect(link).to.equal('<a href="/tasks?sortBy=isComplete&order=1">Completed</a>');
    });
    it('Should return a link to sort by Completed in descending order', function(){
      var link = linkBuilder.sort({sortBy:'isCompleted', order:'1'}, 'completed', 'Completed');
      expect(link).to.equal('<a href="/tasks?sortBy=isComplete&order=-1">Completed</a>');
    });
    it('Should return a link to sort by Completed in acending order filtered by home', function(){
      var link = linkBuilder.sort({filter:'home'}, 'completed', 'Completed');
      expect(link).to.equal('<a href="/tasks?sortBy=isComplete&order=1&filter=home">Completed</a>');
    });
    it('Should return a link to 2nd page sorted by Completed in acending order filtered by home', function(){
      var link = linkBuilder.sort({filter:'home', page:'2'}, 'completed', 'Completed');
      expect(link).to.equal('<a href="/tasks?sortBy=isComplete&order=1&filter=home&page=2">Completed</a>');
    });
  });
  describe('Make Checkbox', function(){
    it('should make a checked checkbox', function(){
      var check = linkBuilder.check(true);
      expect(check).to.equal('<input type="checkbox" name="completed" value="true" checked>');
    });
    it('should make an unchecked checkbox', function(){
      var check = linkBuilder.check(false);
      expect(check).to.equal('<input type="checkbox" name="completed" value="true">');
    });
  });
});
