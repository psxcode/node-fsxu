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

	it('listDirSync', function(done) {
		const res = listDirSync('path/to');

		expect(res).to.exist;
		expect(res.length).to.equal(2);

		done();
	});

	it('listDirSync empty dir', function(done) {
		const res = listDirSync('path/to/empty-dir');

		expect(res).to.exist;
		expect(res.length).to.equal(0);

		done();
	});

	it('listDirSync not existing returns null', function(done) {
		const res = listDirSync('path/to/not-existing');

		expect(res).to.equal(null);

		done();
	});
});