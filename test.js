"use strict";

var indexer = require('./');
var assert = require('assert');
var _ =  require('lodash');
var fs = require('fs');
var path = require('path');

describe('Sample', function() {

  it('should return an object with sample buffer', function(done) {
    indexer('./sample', function(err, files) {
      if (err) return done(err);
      assert.ok(_.isObject(files));
      assert.equal(Object.keys(files).length, 1);
      assert.ok(files.sample);
      assert.ok(Buffer.isBuffer(files.sample));
      done();
    });
  });

  it('should return this test-index.js with 1 key', function(done) {
    var testfile = fs.readFileSync(path.join(__dirname, './sample/test-index.js'));
    indexer(['./sample'], function (err, files) {
      if (err) return done(err);
      assert.ok(_.isObject(files));
      assert.equal(Object.keys(files).length, 1);
      assert.ok(files.sample);
      assert.equal(files.sample.length, testfile.length);
      assert.deepEqual(files.sample, testfile);
      done();
    });
  });

  it('should return the potato-index.js with 2 keys', function(done) {
    var testfile = fs.readFileSync(path.join(__dirname, './sample/potato/potato-index.js'));
    indexer(['./sample/potato', './sample'], function(err, files) {
      if (err) return done(err);
      assert.equal(Object.keys(files).length, 2);
      assert.ok(files.sample);
      assert.ok(files.potato);
      assert.equal(files.potato.length, testfile.length);
      assert.deepEqual(files.potato, testfile);
      done();
    });
  });

  it('should error and return 0 files', function(done) {
    indexer([123, './sample'], function(err, files) {
      assert.deepEqual(err, new Error('Please use strings'));
      assert.throws(function() {
        throw err
      }, Error);
      assert.ok(_.isObject(files));
      assert.equal(Object.keys(files).length, 0);
      done();
    });
  })

});
