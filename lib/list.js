const fs = require('fs'),
	path = require('path'),
	{isDirSync, isFileSync} = require('./is');

module.exports = {
	listFilesSync,
	listDirectoriesSync,
	listSync
};

function listFilesSync(p, resolve = true) {
	if (typeof p === 'string') {
		p = path.resolve(p);

		try {
			const entries = fs.readdirSync(p).filter(e => isFileSync(path.join(p, e)));
			return resolve ? entries.map(e => path.join(p, e)) : entries;
		} catch (e) {
		}
	}
	return null;
}

function listDirectoriesSync(p, resolve = true) {
	if (typeof p === 'string') {
		p = path.resolve(p);

		try {
			const entries = fs.readdirSync(p).filter(e => isDirSync(path.join(p, e)));
			return resolve ? entries.map(e => path.join(p, e)) : entries;
		} catch (e) {
		}
	}
	return null;
}

function listSync(p, resolve = true) {
	if (typeof p === 'string') {
		p = path.resolve(p);

		try {
			const entries = fs.readdirSync(p);
			return resolve ? entries.map(e => path.join(p, e)) : entries;
		} catch (e) {
		}
	}
	return null;
}