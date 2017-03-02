const expect = require('chai').expect,
	fs = require('fs'),
	mockfs = require('mock-fs'),
	emptyDirSync = require('../lib/dir').emptyDirSync,
	makeDirSync = require('../lib/dir').makeDirSync;

describe('makeDirSync', function() {

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

	it('makeDirSync new dir', function(done) {
		const dirpath = 'path/to/new-dir',
			res = makeDirSync(dirpath);

		expect(res).to.equal(true);

		fs.stat(dirpath, function(err, stat) {

			expect(err).to.not.exist;
			expect(stat.isDirectory()).to.equal(true);
			done();
		});
	});

	it('makeDirSync new dir recursive', function(done) {
		const dirpath = 'path/to/new/dir',
			res = makeDirSync(dirpath);

		expect(res).to.equal(true);

		fs.stat(dirpath, function(err, stat) {

			expect(err).to.not.exist;
			expect(stat.isDirectory()).to.equal(true);
			done();
		});
	});

	it('makeDirSync, dir exists', function(done) {
		const dirpath = 'path/to/empty-dir',
			res = makeDirSync(dirpath);

		expect(res).to.equal(true);

		done();
	});

	it('makeDirSync, target exists, is a file', function(done) {
		const dirpath = 'path/to/file.txt',
			res = makeDirSync(dirpath);

		expect(res).to.equal(false);

		done();
	});
});

describe('emptyDirSync', function() {

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

	it('emptyDirSync makes new dir', function(done) {
		const dirpath = 'path/to/new-dir',
			res = emptyDirSync(dirpath);

		expect(res).to.equal(true);

		fs.stat(dirpath, function(err, stat) {

			expect(err).to.not.exist;
			expect(stat.isDirectory()).to.equal(true);
			done();
		});
	});

	it('emptyDirSync makes new dir recursive', function(done) {
		const dirpath = 'path/to/new/dir',
			res = emptyDirSync(dirpath);

		expect(res).to.equal(true);

		fs.stat(dirpath, function(err, stat) {

			expect(err).to.not.exist;
			expect(stat.isDirectory()).to.equal(true);
			done();
		});
	});

	it('emptyDirSync, empties existing dir', function(done) {
		const dirpath = 'path/to',
			res = emptyDirSync(dirpath);

		expect(res).to.equal(true);

		fs.readdir(dirpath, function(err, entries) {

			expect(err).to.not.exist;
			expect(entries).to.exist;
			expect(entries.length).to.equal(0);
			done();
		});
	});

	it('makeDirSync, target exists, is a file', function(done) {
		const dirpath = 'path/to/file.txt',
			res = emptyDirSync(dirpath);

		expect(res).to.equal(false);

		done();
	});
});