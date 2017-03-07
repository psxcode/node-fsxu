const fs = require('fs'),
	path = require('path');

exports.isFileSync = isFileSync;
exports.isDirSync = isDirSync;

function isFileSync(filepath) {
	if (filepath && typeof filepath === 'string') {
		try {
			return fs.statSync(filepath).isFile();
		} catch (e) {
		}
	}

	return false;
}

function isDirSync(dirpath) {

	if (typeof dirpath !== 'string') {
		return false;
	}

	if (!dirpath) {
		dirpath = path.resolve('./');
	}

	try {
		return fs.statSync(dirpath).isDirectory();
	} catch (e) {
	}

	return false;
}