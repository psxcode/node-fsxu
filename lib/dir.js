const fs = require('fs'),
	path = require('path'),
	listDirSync = require('./list').listDirSync,
	isDirSync = require('./is').isDirSync,
	rmSync = require('./rm').rmSync;

exports.makeDirSync = makeDirSync;
exports.emptyDirSync = emptyDirSync;

function makeDirSync(p) {
	try {
		fs.mkdirSync(p);
		return true;
	} catch (e) {
		switch (e.code) {
			//part of the path does not exist
			case 'ENOENT':
				return path.dirname(p) !== p && makeDirSync(path.dirname(p)) && makeDirSync(p);
			//path already exist
			case 'EEXIST':
				try {
					return fs.statSync(p).isDirectory();
				} catch (e) {
					return false;
				}
			//failed for some reason
			default:
				return false;
		}
	}
}

function emptyDirSync(p) {

	var stat = null;
	if (p && typeof p === 'string') {
		try {
			stat = fs.statSync(p);
		} catch (e) {
		}
	}

	if(!stat) {
		return makeDirSync(p);
	} else if(stat.isDirectory()) {

		var entries = listDirSync(p);
		for (var i = 0; i < entries.length; ++i) {
			rmSync(entries[i], true);
		}
		return true;
	}
	return false;
}