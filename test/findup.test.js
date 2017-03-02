const path = require('path'),
	expect = require('chai').expect,
	mockfs = require('mock-fs'),
	findFileUpSync = require('../lib/findup').findFileUpSync;

describe('findFileUpSync', function() {

	beforeEach(function () {
		mockfs({
			'root': {
				'path/to': {
					'file.log': 'content',
					'empty-dir': {}
				},
				'file.txt': 'content'
			}
		});
	});

	afterEach(function () {
		mockfs.restore();
	});

	it('finds a file', function(done) {
		const res = findFileUpSync('file.txt', './root/path/to/empty-dir');

		expect(res).to.equal(path.resolve('root'));

		done();
	});

	it('returns null if not found', function(done) {
		const res = findFileUpSync('file.png', './root/path/to/empty-dir');

		expect(res).to.equal(null);

		done();
	});
});