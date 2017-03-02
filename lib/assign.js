"use strict";

module.exports = function assign(dest, ...sources) {

	if(dest && typeof dest === 'object') {
		sources
			.filter(s => s && typeof s === 'object')
			.reduce((dest, s) => {
				Object.keys(s).reduce((dest, key) => dest[key] = s[key], dest);
				return dest;
			}, dest);
	}

	return dest;
};