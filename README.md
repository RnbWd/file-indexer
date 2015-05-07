file-indexer [![Build Status](https://img.shields.io/travis/RnbWd/file-indexer.svg?style=flat-square)](https://travis-ci.org/RnbWd/file-indexer)[![Dependency Status](https://img.shields.io/david/RnbWd/file-indexer.svg?style=flat-square)](https://david-dm.org/RnbWd/file-indexer)
============

> Create index.js file for folders

[![NPM](https://nodei.co/npm/file-indexer.png?downloads=true)](https://nodei.co/npm/file-indexer/)

```bash
npm install --save-dev file-indexer
```
## Why

Reduces boilerplate for nested file structures.

#### before

```js
var one = require('./path/one');
var two = require('./path/two');
var three = require('./path/three');
```

#### after

**es6**

```js
import {one, two, three} from './path';
```

**js**
```js
var path = require('./path');
var one = path.one, two = path.two, three = path.three;
```

####es6


## How to Use

```js
var indexer = require('file-indexer');
indexer(['./path/folder', './path/src', './path/src/components'], function(err, files) {
  fs.writeFileSync('./path/folder/index.js', files.folder);
  fs.writeFileSync('./path/src/index.js', files.src);
  fs.writeFileSync('./path/src/components/index.js', files.components);
})
```

With folder stucture:


- path/
  - folder/
    - one.js
    - two.js
    - three.js
    - `index.js`

#### path/folder/index.js

```js
var index = {};

module.exports = index;

index['one'] = require('./one');
index['two'] = require('./two');
index['three'] = require('./three');
```

- src/
  - init.js
  - save.js
  - components/
  - `index.js`

#### src/index.js

```js
var index = {};

module.exports = index;

index['init'] = require('./init');
index['save'] = require('./save');
index['components'] = require('./components');
```
- components/
  - header.js
  - footer.js
  - `index.js`

#### components/index.js

```js
var index = {};

module.exports = index;

index['header'] = require('./header');
index['footer'] = require('./footer');
```

Using gulp-ecosystem

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

**MIT**



