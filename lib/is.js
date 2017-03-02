const fs = require('fs');

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
	if (dirpath && typeof dirpath === 'string') {
		try {
			return fs.statSync(dirpath).isDirectory();
		} catch (e) {
		}
	}

	return false;
}