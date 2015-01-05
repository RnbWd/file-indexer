"use strict";

var indexer = require('./');

indexer('./sample', function(err, file) {
  console.log(file[0].toString());
})