const fs = require('fs'),
	path = require('path');

exports.listDirSync = listDirSync;

function listDirSync(p) {
	if (typeof p !== 'string') {
		return null;
	}

	p = path.resolve(p);

	try {
		var entries = fs.readdirSync(p);
	} catch (e) {
		return null;
	}

	//fill actual paths instead of names
	for (var i = 0; i < entries.length; ++i) {
		entries[i] = path.join(p, entries[i]);
	}

	return entries;
}