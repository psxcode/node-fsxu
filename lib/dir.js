const fs = require('fs'),
	path = require('path'),
	listDirSync = require('./list').listDirSync,
	isDirSync = require('./is').isDirSync,
	rmSync = require('./rm').rmSync,
	_0777 = parseInt('0777', 8);

exports.makeDirSync = makeDirSync;
exports.emptyDirSync = emptyDirSync;

function makeDirSync(p, mode = _0777) {

	if (typeof p !== 'string') {
		return false;
	}

	p = path.resolve(p);

	try {
		return fs.mkdirSync(p, mode), true;
	} catch (e) {
		switch (e.code) {
			//part of the path does not exist
			case 'ENOENT':
				return path.dirname(p) !== p && makeDirSync(path.dirname(p), mode) && makeDirSync(p, mode);
			//path already exist
			default:
				try {
					return fs.statSync(p).isDirectory();
				} catch (e) {
					return false;
				}
		}
	}
}

function emptyDirSync(p) {

	if (p && typeof p === 'string') {
		try {
			var stat = fs.statSync(p);
		} catch (e) {
		}
	}

	if (!stat) {
		return makeDirSync(p);
	}

	if (stat.isDirectory()) {

		const entries = listDirSync(p);
		for (let i = 0; i < entries.length; ++i) {
			rmSync(entries[i], true);
		}
		return true;
	}

	return false;
}