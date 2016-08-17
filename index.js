var fs = require('fs');
var path = require('path');

exports.makeDirSync = makeDirSync;
exports.findUpSync = findUpSync;
exports.isFileSync = isFileSync;
exports.isDirSync = isDirSync;
exports.emptyDir = emptyDir;
exports.readJson = readJson;
exports.writeJson = writeJson;

function makeDirSync(p) {
	try {
		fs.mkdirSync(p);
	} catch (e) {
		switch (e.code) {
			case 'ENOENT':
				if (path.dirname(p) === p) return null;

				makeDirSync(path.dirname(p));
				makeDirSync(p);
				break;
		}
	}

	return true;
}

function findUpSync(filename, p) {
	if (!p) p = __dirname;

	try {
		p = path.join(p, filename);
		fs.statSync(p);
		return path.dirname(p);
	} catch (e) {
		console.log(e.code);
		switch (e.code) {
			case 'ENOENT':
				return (path.dirname(p) === p) ? null : findUpSync(filename, path.dirname(p));
		}
	}
}

function isFileSync(filename, p) {
	if (!filename || typeof filename !== 'string') return 'EINVAL';
	if (!p || typeof p !== 'string') p = null;

	try {
		return fs.statSync(p ? path.join(p, filename) : filename).isFile();
	} catch (e) {
		return e.code;
	}
}

function isDirSync(p) {
	if (!p || typeof p !== 'string') return 'EINVAL';

	try {
		return fs.statSync(p).isDirectory();
	} catch (e) {
		return e.code;
	}
}

function emptyDir(p) {

	//ensure path exists
	if (true !== isDirSync(p)) return makeDirSync(p);

	var entries = fs.readdirSync(p);

	entries
		.filter(function (name) {
			return true === isDirSync(path.join(p, name));
		})
		.forEach(function (dirname) {
			var dirpath = path.join(p, dirname);
			emptyDir(dirpath);
			try {
				fs.rmdirSync(dirpath);
			} catch (e) {
				console.log(e);
			}
		});

	entries
		.filter(function (name) {
			return true === isFileSync(path.join(p, name));
		})
		.forEach(function (filename) {
			try {
				fs.unlinkSync(path.join(p, filename));
			} catch (e) {
				console.log(e);
			}
		});

	return true;
}

function readJson(filepath) {
	try {
		return JSON.parse(fs.readFileSync(filepath, {encoding: 'utf8'}));
	} catch (e) {
		return null;
	}
}

function writeJson(filepath, obj) {

	//get path
	var p = path.dirname(filepath);

	//ensure path exists
	if (true !== isDirSync(p)) makeDirSync(p);

	try {
		fs.writeFileSync(filepath, JSON.stringify(obj));
	} catch (e) {
		return null;
	}

	return true;
}