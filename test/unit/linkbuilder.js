/* jshint expr: true */
/* global describe, it */

'use strict';

var expect = require('chai').expect;
var linkBuilder = require('../../app/helpers/linkbuilder');

describe('linkBuilder', function(){
  describe('Due link', function(){
    it('Should return a link to sort by Due in ascending order', function(){
      var link = linkBuilder({}, 'due', 'Due');
      expect(link).to.equal('<a href="/tasks?sortBy=due&order=1">Due</a>');
    });
  });

});
