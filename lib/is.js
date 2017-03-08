const fs = require('fs'),
	path = require('path');

module.exports = {
	isFileSync,
	isDirSync
};

function isFileSync(p) {
	if (typeof p === 'string' && p) {
		try {
			return fs.statSync(p).isFile();
		} catch (e) {
		}
	}

	return false;
}

function isDirSync(p) {
	if (typeof p === 'string') {
		p = path.resolve(p);
		try {
			return fs.statSync(p).isDirectory();
		} catch (e) {
		}
	}

	return false;
}