const expect = require('chai').expect,
	fsxu = require('../'),
	keys = [
		// is
		'isFileSync',
		'isDirSync',

		// dir
		'makeDirSync',
		'emptyDirSync',

		// find
		'findFileUpSync',

		// list
		'listSync',
		'listDirectoriesSync',
		'listFilesSync',

		// rm
		'rmDirSync',
		'rmFileSync',
		'rmSync'
	];

describe('package test', function () {

	it('should contain functions', function () {

		expect(fsxu).all.keys(keys);
	});
});