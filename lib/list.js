const fs = require('fs'),
	path = require('path'),
	{isDirSync, isFileSync} = require('./is');

module.exports = {
	listFileNamesSync,
	listFilePathsSync,
	listDirNamesSync,
	listDirPathsSync,
	listNamesSync,
	listPathsSync
};

function listFilePathsSync(p) {
	if(typeof p === 'string') {
		p = path.resolve(p);
		const entries = listFileNamesSync(p);
		return Array.isArray(entries) ? entries.map(e => path.join(p, e)) : entries;
	}
	return null;
}

function listFileNamesSync(p) {
	if (typeof p === 'string') {
		p = path.resolve(p);

		try {
			return fs.readdirSync(p).filter(e => isFileSync(path.join(p, e)));
		} catch (e) {
		}
	}
	return null;
}

function listDirPathsSync(p) {
	if(typeof p === 'string') {
		p = path.resolve(p);
		const entries = listDirNamesSync(p);
		return Array.isArray(entries) ? entries.map(e => path.join(p, e)) : entries;
	}
	return null;
}

function listDirNamesSync(p) {
	if (typeof p === 'string') {
		p = path.resolve(p);

		try {
			return fs.readdirSync(p).filter(e => isDirSync(path.join(p, e)));
		} catch (e) {
		}
	}
	return null;
}

function listPathsSync(p) {
	if(typeof p === 'string') {
		p = path.resolve(p);
		const entries = listNamesSync(p);
		return Array.isArray(entries) ? entries.map(e => path.join(p, e)) : entries;
	}
	return null;
}

function listNamesSync(p) {
	if (typeof p === 'string') {
		p = path.resolve(p);

		try {
			return fs.readdirSync(p);
		} catch (e) {
		}
	}
	return null;
}