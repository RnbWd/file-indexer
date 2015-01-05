"use strict";

var indexer = require('./');
var assert = require('assert');
var _ =  require('lodash');
var fs = require('fs');

describe('Sample', function() {

  it('should return an array with single buffer', function(done) {
    indexer('./sample', function(err, files) {
      console.log()
      if (err) throw err;
      assert.ok(_.isObject(files));
      assert.ok(files.sample);
      assert.ok(Buffer.isBuffer(files.sample));
      done();
    });
  });

  it('should return this test-index.js', function(done) {
      fs.readFile('./sample/test-index.js', function(err, testfile) {
        if (err) throw err;
        indexer(['./sample'], function(err, files) {
          if (err) throw err;
          assert.ok(files.sample);
          assert.equal(files.sample.length, testfile.length);
          assert.deepEqual(files.sample, testfile);
          done();
      });
    });
  });

  it('should return the potato-index.js', function(done) {
      fs.readFile('./sample/potato/potato-index.js', function(err, testfile) {
        if (err) throw err;
        indexer(['./sample/potato', './sample'], function(err, files) {
          if (err) throw err;
          assert.ok(files.sample);
          assert.ok(files.potato);
          assert.equal(files.potato.length, testfile.length);
          assert.deepEqual(files.potato, testfile);
          done();
      });
    });
  });

});

