const fs = require('fs'),
	path = require('path'),
	isFileSync = require('./is').isFileSync,
	isDirSync = require('./is').isDirSync,
	listDirSync = require('./list').listDirSync;

exports.rmFileSync = rmFileSync;
exports.rmDirSync = rmDirSync;
exports.rmSync = rmSync;

function rmFileSync(filepath) {

	if (typeof filepath === 'string' && filepath) {
		try {
			return fs.unlinkSync(filepath), true;
		} catch (e) {
			return e && e.code === 'ENOENT';
		}
	}
	return false;
}

function rmDirSync(filepath) {

	if (typeof filepath !== 'string') {
		return false;
	}

	if (!filepath) {
		filepath = path.resolve('./')
	}

	if (isDirSync(filepath)) {
		const entries = listDirSync(filepath);
		for (let i = 0; i < entries.length; ++i) {
			const p = entries[i];
			isDirSync(p) ? rmDirSync(p) : rmFileSync(p);
		}
	}

	try {
		return fs.rmdirSync(filepath), true;
	} catch (e) {
		return e && e.code === 'ENOENT';
	}
}

function rmSync(filepath) {

	if (typeof filepath !== 'string') {
		return false;
	}

	if (!filepath) {
		filepath = path.resolve('./');
	}

	try {
		return fs.statSync(filepath).isDirectory() ? rmDirSync(filepath) : rmFileSync(filepath);
	} catch (e) {
	}

	// not found
	return true;
}