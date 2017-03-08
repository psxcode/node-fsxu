const expect = require('chai').expect,
	mockfs = require('mock-fs'),
	{listSync, listDirectoriesSync, listFilesSync} = require('../lib/list');

describe('listSync', function () {

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

	it('should return array of strings', function () {
		const res = listSync('path/to');

		expect(res).instanceOf(Array);
		expect(res).length(2);
	});

	it('should return resolved paths', function () {
		const res = listSync('path/to');

		expect(res[0][0]).equal('/');
	});

	it('should return names if \'resolve\' flag is not set', function () {
		const res = listSync('path/to', false);

		expect(res[0][0]).not.equal('/');
	});

	it('should return empty array if directory is empty', function () {
		const res = listSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'null\' if path does not exist', function () {
		const res = listSync('path/to/not-existing');

		expect(res).null;
	});

	it('should use current dir if path is empty', function () {
		const res = listSync('');

		expect(res).instanceOf(Array);
		expect(res).length(2);
	});

	it('should return \'null\' if path is not a string', function () {
		const res = listSync({});

		expect(res).null;
	});
});

describe('listDirectoriesSync', function () {

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

	it('should return array of strings', function () {
		const res = listDirectoriesSync('path/to');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return resolved paths', function () {
		const res = listDirectoriesSync('path/to');

		expect(res[0][0]).equal('/');
	});

	it('should return names if \'resolve\' flag is not set', function () {
		const res = listDirectoriesSync('path/to', false);

		expect(res[0][0]).not.equal('/');
	});

	it('should return empty array if directory is empty', function () {
		const res = listDirectoriesSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'null\' if path does not exist', function () {
		const res = listDirectoriesSync('path/to/not-existing');

		expect(res).null;
	});

	it('should use current dir if path is empty', function () {
		const res = listDirectoriesSync('');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return \'null\' if path is not a string', function () {
		const res = listDirectoriesSync({});

		expect(res).null;
	});
});

describe('listFilesSync', function () {

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

	it('should return array of strings', function () {
		const res = listFilesSync('path/to');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return resolved paths', function () {
		const res = listFilesSync('path/to');

		expect(res[0][0]).equal('/');
	});

	it('should return names if \'resolve\' flag is not set', function () {
		const res = listFilesSync('path/to', false);

		expect(res[0][0]).not.equal('/');
	});

	it('should return empty array if directory is empty', function () {
		const res = listFilesSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'null\' if path does not exist', function () {
		const res = listFilesSync('path/to/not-existing');

		expect(res).null;
	});

	it('should use current dir if path is empty', function () {
		const res = listFilesSync('');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return \'null\' if path is not a string', function () {
		const res = listFilesSync({});

		expect(res).null;
	});
});