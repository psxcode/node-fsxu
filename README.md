# node-fsxu

[![Greenkeeper badge](https://badges.greenkeeper.io/psxcode/node-fsxu.svg)](https://greenkeeper.io/)
`fsxu` is minimal set of filesystem utility functions inspired by fs-extra

## Installation
```
npm install --save fsxu
```

##Usage

###listDirSync(path)
`listDirSync` works like `readdirSync` function, but returns path+name array instead just names. So you can work with files without joining path. Returns `null`
```javascript
var fsxu = require('fsxu');

fsxu.listDirSync('my/path'); //['my/path/file.json', 'my/path/dir01']

fsxu.listDirSync('path/does/not/exist'); //null
```

###makeDirSync(path)
`makeDirSync` works like `mkdir -p` command. It recursively creates directories. Works with absolute and relative paths. Returns `true` if everything was ok.
```javascript
var fsxu = require('fsxu');

fsxu.makeDirSync('create/deep/nested/path'); //true
```

###findUpSync(name[, path])
`findUpSync` searches for file or directory starting from path or `__dirname`, and going up, until it reaches filesystem root. Once found, the absolute path is returned, otherwise `null`.
```javascript
var fsxu = require('fsxu');

//get project root directory
var rootDir = fsxu.findUpSync('package.json'); // '/Users/psxcode/dev/my-proj'

var filepath = fsxu.findUpSync('config.json', 'search/from/here'); // '/Users/psxcode/dev/my-proj/search'
```

###isFileSync(filepath)
`isFileSync` returns `true` if path provided is a file
```javascript
var fsxu = require('fsxu');

//check if file exists
fsxu.isFileSync('path/to/my/file.json')); //true //file exists

//get only files listed in directory
var files = fsxu.listDirSync('path/to/my/files').filter(fsxu.isFileSync);
```

###isDirSync(path)
`isDirSync` returns `true` if path provided is a directory
```javascript
var fsxu = require('fsxu');

//check if directory exists
fsxu.isDirSync('path/to/my/dir')); // true //directory exists 

//get only directories listed in directory
var files = fsxu.listDirSync('path/to/my/dir').filter(fsxu.isDirSync);
```

###emptyDirSync(path)
`emptyDirSync` ensures that a directory is empty. Deletes directory contents if the directory is not empty. If the directory does not exist, it is created. The directory itself is not deleted. Returns `true` if everything was ok.
```javascript
var fsxu = require('fsxu');

fsxu.emptyDirSync('relative-path-to-my-dir'); //true

fsxu.emptyDirSync('/absolute/path/to/my/dir'); //true
```

###rmDirSync(path[, recursive])
`rmDirSync` removes directory. If `recursive` is set to `true` recursively removes all content, and then the directory. Returns `true` if directory does not exist or if removal was successfull.
```javascript
var fsxu = require('fsxu');

//try to remove
fsxu.rmDirSync('path/to/my/dir'); // false //directory is not empty

//use recursive option
fsxu.rmDirSync('path/to/my/dir', true); //true //now removed 

```

###rmFileSync(pathname)
`rmFileSync` removes file. Returns `true` if file does not exist or if removal was successfull.
```javascript
var fsxu = require('fsxu');

//try to remove
fsxu.rmFileSync('path/to/my/file.json'); // true //file removed

//ensure removed
fsxu.rmFileSync('path/to/my/file.json'); //true //does not exist 

```

###rmSync(pathname[, recursive])
`rmSync` removes file or directory. If target is directory and `recursive` is set to `true` recursively removes all content, and then the directory. Returns `true` if target does not exist or if removal was successfull.
```javascript
var fsxu = require('fsxu');

//try to remove
fsxu.rmSync('path/to/my/file.json'); // true //file removed

//ensure removed
fsxu.rmSync('path', true); //true //recursively removes everything in 'path' and the 'path' itself.

```

###readJsonSync(filepath)
`readJsonSync` returns parsed JSON content. Returns `null` if something was wrong.
```javascript
var fsxu = require('fsxu');

var jsonObj = fsxu.readJsonSync('path/to/file.json');
if(jsonObj) {
  //use the object
}
```

###writeJsonSync(filepath, object)
`writeJsonSync` stringifies `object` and writes it to `.json` file. If the directory does not exist, it is created. Returns `true` if write was successfull.
```javascript
var fsxu = require('fsxu');

var jsonObj = {
  name: 'alex',
  hobby: 'javascript'
};

fsxu.writeJsonSync('path/to/file.json', jsonObj); //true
```
