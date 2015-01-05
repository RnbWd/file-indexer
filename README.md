file-indexer
============

Create index.js file for folders

```bash
npm install --save-dev file-indexer
```


### How to Use

```js
var indexer = require('file-indexer');
indexer('./path/folder', function(err, buf) {
  fs.writeFileSync('./path/folder/index.js', buf);
})
```