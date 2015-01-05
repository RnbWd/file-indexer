'use strict';

var globby = require('globby');
var _ = require('lodash');
var each = require('each-async');

module.exports = function (files, cb) {
  var results = {};
  if (!_.isArray(files)) files = [files];
  each(files, function(item, index, done) {
    if (typeof item !== 'string') return done(new Error('Please use strings'));
    indexer(item, function(err, file) {
      if (err) return done(err);
      results = _.assign(results, file);
      done();
    });
  }, function(err) {
    cb(err, results);
  })
}

function indexer(glob, cb) {
  glob = glob+'/**';
  globby(glob, function (err, paths) {
    if (err) return cb(new Error(err));
    var obj = {};
    var dest = paths.shift();
    var name = dest.split('/').pop();
    var lg = dest.length;
    paths = paths.map(function(p) {
      return p.substr(lg+1).split('.');
    });
    // see template.js
    var indexed = "var index = {};\n\nmodule.exports = index;\n<% paths.forEach(function(p) { if (p[0] !== 'index' && p[0].split('/').length === 1) { %>\nindex['<%= p[0] %>'] = require('./<%= p[0] %>'); <% }}) %>";
    var file = _.template(indexed, {paths: paths});
    var buffer = new Buffer(file);
    obj[name] = buffer;
    cb(null, obj);
  });
}