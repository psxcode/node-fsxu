const fs = require('fs'),
	path = require('path'),
	{isDirSync} = require('./is'),
	{listPathsSync} = require('./list');

module.exports = {
	rmFileSync,
	rmDirSync,
	rmSync
};

function rmFileSync(p) {
	if (typeof p === 'string' && p) {
		try {
			return fs.unlinkSync(p), true;
		} catch (e) {
			return e && e.code === 'ENOENT';
		}
	}
	return false;
}

function rmDirSync(p) {
	if (typeof p === 'string') {
		p = path.resolve(p);

		if (isDirSync(p)) {
			listPathsSync(p).forEach(rmSync)
		}

		try {
			return fs.rmdirSync(p), true;
		} catch (e) {
			return e && e.code === 'ENOENT';
		}
	}
	return false;
}

function rmSync(p) {
	if (typeof p === 'string') {
		p = path.resolve(p);
		return isDirSync(p) ? rmDirSync(p) : rmFileSync(p);
	}
	return false;
}