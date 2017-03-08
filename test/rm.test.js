const chai = require('chai'),
	expect = chai.expect,
	fs = require('fs'),
	mockfs = require('mock-fs'),
	{rmSync, rmDirSync, rmFileSync} = require('../lib/rm');

chai.use(require('chai-fs'));

describe('rmDirSync', function () {

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

	it('should remove empty dir', function () {
		const dirpath = './path/to/empty-dir';

		expect(dirpath).directory('directory should exist before test');
		expect(rmDirSync(dirpath)).true;
		expect(dirpath).not.path('path should not exist after test');
	});

	it('should remove content recursively', function () {
		const dirpath = './path';

		expect(dirpath).directory('directory should exist before test');
		expect(rmDirSync(dirpath, true)).true;
		expect(dirpath).not.path('path should not exist after test');
	});

	it('returns \'true\' if path does not exist', function () {
		const dirpath = './not-existing';

		expect(dirpath).not.path('path should not exist before test');
		expect(rmDirSync(dirpath)).true;
		expect(dirpath).not.path('path should not exist after test');
	});

	it('returns \'false\' if path is a file', function () {
		const dirpath = './path/to/file.txt';

		expect(dirpath).file('file should exist before test');
		expect(rmDirSync(dirpath)).false;
		expect(dirpath).file('file should exist after test');
	});

	it('should resolve to current dir if path is empty', function () {
		const dirpath = '';

		expect(dirpath).path('path should exist before test');
		expect(rmDirSync(dirpath)).true;
		expect(dirpath).not.path('path should not exist after test');
	});

	it('should return false if path is not string', function () {
		const dirpath = {};

		expect(String(dirpath)).not.path('path should not exist before test');
		expect(rmDirSync(dirpath)).false;
	});
});

describe('rmFileSync', function () {

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

	it('should remove file', function () {
		const filepath = './path/to/file.txt';

		expect(filepath).file('file should exist before test');
		expect(rmFileSync(filepath)).true;
		expect(filepath).not.path('path should not exist after test');
	});

	it('returns \'true\' if path does not exist', function () {
		const filepath = './path/to/not-existing';

		expect(filepath).not.path('path should not exist before test');
		expect(rmFileSync(filepath)).true;
		expect(filepath).not.path('path should not exist after test');
	});

	it('returns false if path is not a file', function () {
		const filepath = './path/to';

		expect(filepath).not.file('path should not be a file before test');
		expect(rmFileSync(filepath)).false;
		expect(filepath).path('path should exist after test');
	});

	it('should return false if path is empty', function () {
		const dirpath = '';

		expect(rmFileSync(dirpath)).false;
	});

	it('should return false if path is not a string', function () {
		const dirpath = {};

		expect(rmFileSync(dirpath)).false;
	});
});

describe('rmSync', function () {

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

	it('rmSync removes file', function () {
		const filepath = './path/to/file.txt';

		expect(filepath).file('file should exist before test');
		expect(rmSync(filepath)).true;
		expect(filepath).not.path('path should not exist after test');
	});

	it('rmSync removes empty dir', function () {
		const dirpath = './path/to/empty-dir';

		expect(dirpath).directory('directory should exist before test');
		expect(rmSync(dirpath)).true;
		expect(dirpath).not.path('path should not exist after test');
	});

	it('rmSync removes dir recursive', function () {
		const dirpath = './path/to';

		expect(dirpath).directory('directory should exist before test');
		expect(rmSync(dirpath)).true;
		expect(dirpath).not.path('path should not exist after test');
	});

	it('rmSync not existing returns true', function () {
		const dirpath = './not-existing';

		expect(dirpath).not.path('path should not exist after test');
		expect(rmSync(dirpath)).true;
	});

	it('should resolve to current dir if path is empty', function () {
		const dirpath = '';

		expect(dirpath).path('path should exist before test');
		expect(rmSync(dirpath)).true;
		expect(dirpath).not.path('path should not exist after test');
	});

	it('should return false if path is not a string', function () {
		const dirpath = {};

		expect(rmSync(dirpath)).false;
	});
});