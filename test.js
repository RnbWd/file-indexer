"use strict";

var indexer = require('./');
var assert = require('assert');
var _ =  require('lodash');
var fs = require('fs');

describe('Sample', function() {

  it('should return an array with single buffer', function(done) {
    indexer('./sample', function(err, file) {
      if (err) throw err;
      assert.ok(_.isObject(file));
      assert.ok(file.sample);
      assert.ok(Buffer.isBuffer(file.sample));
      done();
    });
  });

  it('should return this test-index.js', function(done) {
      fs.readFile('./sample/test-index.js', function(err, testfile) {
        if (err) throw err;
        indexer(['./sample'], function(err, file) {
          if (err) throw err;
          assert.ok(file.sample);
          assert.equal(file.sample.length, testfile.length);
          assert.deepEqual(file.sample, testfile);
          done();
      });
    });
  });

  it('should return the potato-index.js', function(done) {
      fs.readFile('./sample/potato/potato-index.js', function(err, testfile) {
        if (err) throw err;
        indexer(['./sample/potato', './sample'], function(err, file) {
          if (err) throw err;
          assert.ok(file.sample);
          assert.ok(file.potato);
          assert.equal(file.potato.length, testfile.length);
          assert.deepEqual(file.potato, testfile);
          done();
      });
    });
  });

});

