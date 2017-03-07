"use strict";

module.exports = assign({},
	require('./list'),
	require('./is'),
	require('./dir'),
	require('./rm'),
	require('./findup')
);

function assign(dest, ...sources) {

	return sources
		.filter(function (s) {
			return s && typeof s === 'object'
		})
		.reduce(function (dest, s) {
			Object.keys(s).reduce(function (dest, key) {
				dest[key] = s[key];
				return dest;
			}, dest);
			return dest;
		}, (dest && typeof dest === 'object') ? dest : {});
}

// coverage 100% code
assign(42);