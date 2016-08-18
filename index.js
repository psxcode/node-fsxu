"use strict";

var fs = require('fs');
var path = require('path');

exports.makeDirSync = makeDirSync;
exports.findUpSync = findUpSync;
exports.listDirSync = listDirSync;
exports.isFileSync = isFileSync;
exports.isDirSync = isDirSync;
exports.emptyDirSync = emptyDirSync;
exports.rmDirSync = rmDirSync;
exports.rmFileSync = rmFileSync;
exports.rmSync = rmSync;
exports.readJsonSync = readJsonSync;
exports.writeJsonSync = writeJsonSync;

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
				return true;
			//failed for some reason
			default:
				return false;
		}
	}
}

function findUpSync(filename, p) {
	p = p ? path.resolve(p) : __dirname;

	try {
		fs.statSync(path.join(p, filename));
		return p;
	} catch (e) {
		switch (e.code) {
			case 'ENOENT':
				return (path.dirname(p) === p) ? null : findUpSync(filename, path.dirname(p));
		}
	}
}

function isFileSync(pathname) {
	if (pathname && typeof pathname === 'string') {
		try { return fs.statSync(pathname).isFile(); } catch (e) {}
	}

	return false;
}

function isDirSync(pathname) {
	if (pathname && typeof pathname === 'string') {
		try { return fs.statSync(pathname).isDirectory(); } catch (e) {}
	}

	return false;
}

function listDirSync(p) {
	try {
		var entries = fs.readdirSync(p);
	} catch (e) { return null; }

	//fill actual paths instead of names
	for (var i = 0; i < entries.length; ++i) {
		entries[i] = path.join(p, entries[i]);
	}

	return entries;
}

function emptyDirSync(p) {

	//ensure path exists
	if (!isDirSync(p)) return makeDirSync(p);

	var entries = listDirSync(p);

	//not using standard forEach here, cause it is much slower
	for (var i = 0; i < entries.length; ++i) {
		rmSync(entries[i], true);
	}

	return true;
}

function rmFileSync(filepath) {
	try {
		fs.unlinkSync(filepath);
		return true;
	} catch (e) {
		return e.code === 'ENOENT';
	}
}

function rmDirSync(filepath, recursive) {

	if (recursive) {
		var entries = listDirSync(filepath);
		//for is much faster than standard forEach

		for (var i = 0; i < entries.length; ++i) {
			if (isDirSync(entries[i])) {
				rmDirSync(entries[i], recursive);
				try { fs.rmdirSync(entries[i]); } catch (e) {}
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

	if (isFileSync(filepath)) {
		return rmFileSync(filepath);
	} else if (isDirSync(filepath)) {
		return rmDirSync(filepath, recursive);
	}

	return false;
}

function readJsonSync(filepath) {
	try {
		return JSON.parse(fs.readFileSync(filepath, {encoding: 'utf8'}));
	} catch (e) {}

	return null;
}

function writeJsonSync(filepath, obj) {

	//get path
	var p = path.dirname(filepath);

	//ensure path exists
	if (makeDirSync(p)) {
		try {
			fs.writeFileSync(filepath, JSON.stringify(obj));
			return true;
		} catch (e) {}
	}

	return false;
}