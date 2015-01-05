file-indexer
============

Create index.js file for folders

```bash
npm install --save-dev file-indexer
```


## How to Use

```js
var indexer = require('file-indexer');
indexer(['./path/folder', './path/src', './path/src/components'], function(err, fo;es) {
  fs.writeFileSync('./path/folder/index.js', files.folder);
  fs.writeFileSync('./path/src/index.js', files.src);
  fs.writeFileSync('./path/src/components/index.js', files.components);
})
```

With folder stucture:


- path
  - folder
    one.js
    two.js
    three.js
    index.js
  - src
    init.js
    save.js
    index.js
    - components
      header.js
      footer.js
      index.js


#### path/folder/index.js  

```js
var index = {};

module.exports = index;

index['one'] = require('./one');
index['two'] = require('./two');
index['three'] = require('./three');
```

#### path/src/index.js  

```js
var index = {};

module.exports = index;

index['init'] = require('./init');
index['save'] = require('./save');
index['components'] = require('./components');
```

#### path/src/components/index.js  

```js
var index = {};

module.exports = index;

index['header'] = require('./header');
index['footer'] = require('./footer');
```

#### Gulp-Pattern (plugin in the works)

```js
var tap = require('gulp-tap');
var conflict = require('gulp-conflict')
var rename = require('gulp-rename');

var paths = ['./path/folder', './path/src'];

gulp.task('index', function() {
  indexer(paths, function(err, files) {

    gulp.src(paths)
        .pipe(tap(function(file) {
          gulp.src(file.path, {read: false})
              .pipe(tap(function(file) {
                file.contents = files[file.relative]
              }))
              .pipe(rename('index.js'))
              .pipe(conflict(file.path))
              .pipe(gulp.dest(file.path))
        }))

  })
})
```

## API

### indexer(array|string, callback)

#### array|string

A folder path string (or an array of folder paths) where you'd like to generate index.js files.

#### callback(error, files)

`files`: an **object of buffers** labeled by relative filename.

if  `indexer(['./file1', './path/file2'], cb(<err>, <files>))`


```js

files = {
 file1: <buf>,
 file2: <buf>
}

```



