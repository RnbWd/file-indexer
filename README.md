file-indexer
============

Create index.js file for folders

`npm install --save-dev file-indexer`


### How to Use

```
var indexer = require('file-indexer');
indexer('./path/folder', function(err, buf) {
  fs.writeFileSync('./path/folder/index.js', buf);
})
```