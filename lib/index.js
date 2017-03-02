"use strict";

const assign = require('./assign');

const fsxu = assign({},
	require('./list'),
	require('./is'),
	require('./dir'),
	require('./rm'),
	require('./findup')
);

module.exports = fsxu;