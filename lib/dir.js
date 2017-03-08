const fs = require('fs'),
	path = require('path'),
	{listSync} = require('./list'),
	{isDirSync} = require('./is'),
	{rmSync} = require('./rm'),
	_0777 = parseInt('0777', 8);

module.exports = {
	makeDirSync,
	emptyDirSync
};

function makeDirSync(p, mode = _0777) {
	if (typeof p === 'string') {
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
					return isDirSync(p);
			}
		}
	}
	return false;
}

function emptyDirSync(p) {
	return isDirSync(p) ? (listSync(p).forEach(rmSync), true) : makeDirSync(p);
}