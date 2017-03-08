const chai = require('chai'),
	expect = chai.expect,
	fs = require('fs'),
	mockfs = require('mock-fs'),
	{makeDirSync, emptyDirSync} = require('../lib/dir'),
	_0000 = parseInt('0000', 8);

chai.use(require('chai-fs'));

describe('makeDirSync', function () {

	beforeEach(function () {
		mockfs({
			'path/to': {
				'file.txt': 'content',
				'empty-dir': {},
				'no-access': mockfs.directory({
					mode: _0000,
					items: {
						'dir': {}
					}
				})
			},
			'file.txt': 'content'
		});
	});

	afterEach(function () {
		mockfs.restore();
	});

	it('makeDirSync new dir', function () {
		const dirpath = 'path/to/new-dir';

		expect(dirpath).not.path('path should not exist before test');
		expect(makeDirSync(dirpath)).true;
		expect(dirpath).directory('directory should exist after test');
	});

	it('makeDirSync new dir recursive', function () {
		const dirpath = 'path/to/new/dir';

		expect(dirpath).not.path('path should not exist before test');
		expect(makeDirSync(dirpath)).true;
		expect(dirpath).directory('directory should exist after test');
	});

	it('makeDirSync, dir exists', function () {
		const dirpath = 'path/to/empty-dir';

		expect(dirpath).directory('directory should exist before test');
		expect(makeDirSync(dirpath)).true;
		expect(dirpath).directory('directory should exist after test');
	});

	it('makeDirSync, target exists, is a file', function () {
		const dirpath = 'path/to/file.txt';

		expect(dirpath).file('file should exist before test');
		expect(makeDirSync(dirpath)).false;
		expect(dirpath).file('file should exist after test');
	});

	it('should return false if directory exists, but cannot be accessed', function () {
		const dirpath = 'path/to/no-access/dir';

		expect(makeDirSync(dirpath)).false;
	});

	it('should resolve to current dir if path is empty', function () {
		const dirpath = '';

		expect(dirpath).path('path should exist before test');
		expect(makeDirSync(dirpath)).true;
	});

	it('should return false if path is not a string', function () {
		const dirpath = {};

		expect(String(dirpath)).not.path('path should not exist before test');
		expect(makeDirSync(dirpath)).false;
	});
});

describe('emptyDirSync', function () {

	beforeEach(function () {
		mockfs({
			'path/to': {
				'file.txt': 'content',
				'empty-dir': {}
			},
			'file.txt': 'content'
		});
	});

	afterEach(function () {
		mockfs.restore();
	});

	it('emptyDirSync makes new dir', function () {
		const dirpath = 'path/to/new-dir';

		expect(dirpath).not.path('path should not exist before test');
		expect(emptyDirSync(dirpath)).true;
		expect(dirpath).directory('directory should exist after test').and.empty;
	});

	it('emptyDirSync makes new dir recursive', function () {
		const dirpath = 'path/to/new/dir';

		expect(dirpath).not.path('path should not exist before test');
		expect(emptyDirSync(dirpath)).true;
		expect(dirpath).directory('directory should exist after test').and.empty;
	});

	it('emptyDirSync, empties existing dir', function () {
		const dirpath = 'path/to';

		expect(dirpath).directory('directory should exist before test');
		expect(emptyDirSync(dirpath)).true;
		expect(dirpath).directory('directory should exist after test').and.empty;
	});

	it('makeDirSync, target exists, is a file', function () {
		const dirpath = 'path/to/file.txt';

		expect(dirpath).file('file should exist before test');
		expect(emptyDirSync(dirpath)).false;
		expect(dirpath).file('file should exist after test');
	});

	it('should resolve to current dir if path is empty', function () {
		const dirpath = '';

		expect(dirpath).path('path should exist before test');
		expect(emptyDirSync(dirpath)).true;
	});

	it('should return false if path is not a string', function () {
		const dirpath = {};

		expect(String(dirpath)).not.path('path should not exist before test');
		expect(emptyDirSync(dirpath)).false;
	});
});