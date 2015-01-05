'use strict';

var globby = require('globby');
var _ = require('lodash');
var each = require('each-async');

module.exports = function (files, cb) {
  var results = [];
  if (!_.isArray(files)) files = [files];
  each(files, function(item, index, done) {
    indexer(item, function(err, file) {
      if (err) return done(err);
      results.push(file);
      done();
    });
  }, function(err) {
    cb(err, results);
  })
}

function indexer(glob, cb) {
  glob = glob+'/**';
  globby(glob, function (err, paths) {
    if (err) return cb(err);
    var dest = paths.shift();
    var lg = dest.length;
    paths = paths.map(function(p) {
      return p.substr(lg+1).split('.');
    });
    var indexed = "var index = {};\n\nmodule.exports = index;\n<% paths.forEach(function(p) { if (p[0] !== 'index' && p[0].split('/').length === 1) { %>\nindex[<%= p[0] %>] = require('./<%= p[0] %>'); <% }}) %>";
    var file = _.template(indexed, {paths: paths});
    var buffer = new Buffer(file);
    cb(null, buffer);
  });
}