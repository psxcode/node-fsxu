const expect = require('chai').expect,
	mockfs = require('mock-fs'),
	{listNamesSync, listPathsSync, listDirNamesSync, listDirPathsSync, listFileNamesSync, listFilePathsSync} = require('../lib/list');

describe('listNamesSync', function () {

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
		const res = listNamesSync('path/to');

		expect(res).instanceOf(Array);
		expect(res).length(2);
	});

	it('should return names', function () {
		const res = listNamesSync('path/to');

		expect(res[0][0]).not.equal('/');
	});

	it('should return empty array if directory is empty', function () {
		const res = listNamesSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'null\' if path does not exist', function () {
		const res = listNamesSync('path/to/not-existing');

		expect(res).null;
	});

	it('should use current dir if path is empty', function () {
		const res = listNamesSync('');

		expect(res).instanceOf(Array);
		expect(res).length(2);
	});

	it('should return \'null\' if path is not a string', function () {
		const res = listNamesSync({});

		expect(res).null;
	});
});

describe('listPathsSync', function () {

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
		const res = listPathsSync('path/to');

		expect(res).instanceOf(Array);
		expect(res).length(2);
	});

	it('should return resolved paths', function () {
		const res = listPathsSync('path/to');

		expect(res[0][0]).equal('/');
	});

	it('should return empty array if directory is empty', function () {
		const res = listPathsSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'null\' if path does not exist', function () {
		const res = listPathsSync('path/to/not-existing');

		expect(res).null;
	});

	it('should use current dir if path is empty', function () {
		const res = listPathsSync('');

		expect(res).instanceOf(Array);
		expect(res).length(2);
	});

	it('should return \'null\' if path is not a string', function () {
		const res = listPathsSync({});

		expect(res).null;
	});
});

describe('listDirNamesSync', function () {

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
		const res = listDirNamesSync('path/to');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return names', function () {
		const res = listDirNamesSync('path/to');

		expect(res[0][0]).not.equal('/');
	});

	it('should return empty array if directory is empty', function () {
		const res = listDirNamesSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'null\' if path does not exist', function () {
		const res = listDirNamesSync('path/to/not-existing');

		expect(res).null;
	});

	it('should use current dir if path is empty', function () {
		const res = listDirNamesSync('');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return \'null\' if path is not a string', function () {
		const res = listDirNamesSync({});

		expect(res).null;
	});
});

describe('listDirPathsSync', function () {

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
		const res = listDirPathsSync('path/to');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return names', function () {
		const res = listDirPathsSync('path/to');

		expect(res[0][0]).equal('/');
	});

	it('should return empty array if directory is empty', function () {
		const res = listDirPathsSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'null\' if path does not exist', function () {
		const res = listDirPathsSync('path/to/not-existing');

		expect(res).null;
	});

	it('should use current dir if path is empty', function () {
		const res = listDirPathsSync('');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return \'null\' if path is not a string', function () {
		const res = listDirPathsSync({});

		expect(res).null;
	});
});

describe('listFileNamesSync', function () {

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
		const res = listFileNamesSync('path/to');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return names', function () {
		const res = listFileNamesSync('path/to');

		expect(res[0][0]).not.equal('/');
	});

	it('should return empty array if directory is empty', function () {
		const res = listFileNamesSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'null\' if path does not exist', function () {
		const res = listFileNamesSync('path/to/not-existing');

		expect(res).null;
	});

	it('should use current dir if path is empty', function () {
		const res = listFileNamesSync('');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return \'null\' if path is not a string', function () {
		const res = listFileNamesSync({});

		expect(res).null;
	});
});

describe('listFilePathsSync', function () {

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
		const res = listFilePathsSync('path/to');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return resolved names', function () {
		const res = listFilePathsSync('path/to');

		expect(res[0][0]).equal('/');
	});

	it('should return empty array if directory is empty', function () {
		const res = listFilePathsSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'null\' if path does not exist', function () {
		const res = listFilePathsSync('path/to/not-existing');

		expect(res).null;
	});

	it('should use current dir if path is empty', function () {
		const res = listFilePathsSync('');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return \'null\' if path is not a string', function () {
		const res = listFilePathsSync({});

		expect(res).null;
	});
});