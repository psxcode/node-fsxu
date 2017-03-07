const fs = require('fs'),
	path = require('path');

module.exports.findFileUpSync = findFileUpSync;

function findFileUpSync(filename, p) {
	p = (p && typeof p === 'string') ? path.resolve(p) : __dirname;

	if(!filename || typeof filename !== 'string') {
		return null;
	}

	try {
		fs.statSync(path.join(p, filename));
		return p;
	} catch (e) {
		switch (e.code) {
			case 'ENOENT':
				return (path.dirname(p) === p) ? null : findFileUpSync(filename, path.dirname(p));
		}
	}
}