file-indexer
============

Create index.js file for folders

```bash
npm install --save-dev file-indexer
```


## How to Use

```js
var indexer = require('file-indexer');
indexer(['./path/folder', './path/src'], function(err, buf) {
  fs.writeFileSync('./path/folder/index.js', buf['folder']);
  fs.writeFileSync('./path/src/index.js', buf['src']);
})
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

if `indexer(['./file1', './path/file2'], cb(err, files)`

then 

```js
files = {
   file1: <buf>,
   file2: <buf>
  }

```


