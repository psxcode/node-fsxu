const expect = require('chai').expect,
	mockfs = require('mock-fs'),
	listDirSync = require('../lib/list').listDirSync;

describe('list', function() {

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

	it('listDirSync', function() {
		const res = listDirSync('path/to');

		expect(res).instanceOf(Array);
		expect(res).length(2);
	});

	it('listDirSync empty dir', function() {
		const res = listDirSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should use current dir if path is empty', function() {
		const res = listDirSync('');

		expect(res).instanceOf(Array);
		expect(res).length(2);
	});

	it('listDirSync not existing returns null', function() {
		const res = listDirSync('path/to/not-existing');

		expect(res).null;
	});

	it('should return null if path is not a string', function() {
		const res = listDirSync({});

		expect(res).null;
	});

	it('should return null if path is not a string', function() {
		const res = listDirSync({});

		expect(res).null;
	});
});