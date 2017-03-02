const expect = require('chai').expect,
	mockfs = require('mock-fs'),
	isFileSync = require('../lib/is').isFileSync,
	isDirSync = require('../lib/is').isDirSync;

describe('is', function () {

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

	it('isFileSync', function (done) {

		const actual1 = isFileSync('path/to/file.txt'),
			actual2 = isFileSync('path/to'),
			actual3 = isFileSync('invalid');

		expect(actual1).to.equal(true);
		expect(actual2).to.equal(false);
		expect(actual3).to.equal(false);

		done();
	});

	it('isDirSync', function (done) {

		const actual1 = isDirSync('path/to'),
			actual2 = isDirSync('path/to/file.txt'),
			actual3 = isDirSync('invalid');

		expect(actual1).to.equal(true);
		expect(actual2).to.equal(false);
		expect(actual3).to.equal(false);

		done();
	});
});