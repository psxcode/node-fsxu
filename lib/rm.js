const fs = require('fs'),
	isFileSync = require('./is').isFileSync,
	isDirSync = require('./is').isDirSync,
	listDirSync = require('./list').listDirSync;

exports.rmFileSync = rmFileSync;
exports.rmDirSync = rmDirSync;
exports.rmSync = rmSync;

function rmFileSync(filepath) {
	try {
		fs.unlinkSync(filepath);
		return true;
	} catch (e) {
		return e.code === 'ENOENT';
	}
}

function rmDirSync(filepath, recursive) {

	if (isDirSync(filepath) && recursive) {
		const entries = listDirSync(filepath);

		for (let i = 0; i < entries.length; ++i) {
			if (isDirSync(entries[i])) {
				rmDirSync(entries[i], recursive);
				try {
					fs.rmdirSync(entries[i]);
				} catch (e) {
				}
			} else if (isFileSync(entries[i])) {
				rmFileSync(entries[i]);
			}
		}
	}

	try {
		fs.rmdirSync(filepath);
		return true;
	} catch (e) {
		return e.code === 'ENOENT';
	}
}

function rmSync(filepath, recursive) {

	var stat = null;
	if (filepath && typeof filepath === 'string') {
		try {
			stat = fs.statSync(filepath);
		} catch (e) {
		}
	}

	if (stat) {
		if (isFileSync(filepath)) {
			return rmFileSync(filepath);
		}

		if (isDirSync(filepath)) {
			return rmDirSync(filepath, recursive);
		}

		return false;
	}

	// not found
	return true;
}