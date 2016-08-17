# node-fsxu
`fsxu` is minimal set of filesystem utility functions inspired by fs-extra

## Installation
```
npm install --save fsxu
```

##Usage

###makeDirSync(path)
`makeDirSync` works like `mkdir -p` command. It recursively creates directories.
```javascript
var fsxu = require('fsxu');

fsxu.makeDirSync('create/deep/nested/path');
```

###emptyDir(path)
`emptyDir` ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted.
```javascript
var fsxu = require('fsxu');

fsxu.emptyDir('relative-path-to-my-dir');
fsxu.emptyDir('/absolute/path/to/my/dir');
```

###findUpSync(name[, path])
`findUpSync` searches for file or directory starting from path or `__dirname`, and going up one level, if not found, until it reaches filesystem root. Once found, the path is returned, otherwise it returns `null`.
```javascript
var fsxu = require('fsxu');

//get project root directory
var rootDir = fsxu.findUpSync('package.json');
```

###isFileSync(filepath)
`isFileSync` returns `true` if path provided is a file
```javascript
var fs = require('fs');
var path = require('path');
var fsxu = require('fsxu');

//check if file exists
if(true === fsxu.isFileSync('path/to/my/file.json')) {
  //file exists
}

//get only files listed in directory
var files = fs.readdirSync('path/to/my/files').filter(function(entry) {
  return true === fsxu.isFileSync(path.join('path/to/my/files', entry));
});
```

###isDirSync(path)
`isDirSync` returns `true` if path provided is a directory
```javascript
var fs = require('fs');
var path = require('path');
var fsxu = require('fsxu');

//check if directory exists
if(true === fsxu.isDirSync('path/to/my/dir')) {
  //directory exists
}

//get only directories listed in directory
var files = fs.readdirSync('path/to/my/dir').filter(function(entry) {
  return true === fsxu.isDirSync(path.join('path/to/my/dir', entry));
});
```

###readJson(filepath)
`readJson` returns parsed JSON content. Returns `null` if something was wrong.
```javascript
var fsxu = require('fsxu');

var jsonObj = fsxu.readJson('path/to/file.json');
if(jsonObj) {
  //use the object
}
```

###writeJson(filepath, object)
`writeJson` stringifies `object` and writes it to `.json` file. If the directory does not exist, it is created.
```javascript
var fsxu = require('fsxu');

var jsonObj = fsxu.readJson('path/to/file.json');
if(jsonObj) {
  //use the object
}
```
