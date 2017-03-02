const fs = require('fs'),
	path = require('path');

module.exports.findFileUpSync = findFileUpSync;

function findFileUpSync(filename, p) {
	p = p ? path.resolve(p) : __dirname;

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