const expect = require('chai').expect,
	mockfs = require('mock-fs'),
	rmDirSync = require('../lib/rm').rmDirSync,
	rmFileSync = require('../lib/rm').rmFileSync,
	rmSync = require('../lib/rm').rmSync,
	fs = require('fs');

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

	it('rmDirSync empty dir', function (done) {

		const dirpath = './path/to/empty-dir',
			res = rmDirSync(dirpath);

		expect(res).to.equal(true);

		fs.stat(dirpath, function (err) {
			expect(err).to.exist;
			done();
		});
	});

	it('rmDirSync recursive', function (done) {

		const res = rmDirSync('./path', true);

		expect(res).to.equal(true);

		fs.stat('./path/to/file.txt', function (err) {
			expect(err).to.exist;
			done();
		});
	});

	it('rmDirSync not existing returns true', function (done) {

		const res = rmDirSync('./not-existing');

		expect(res).to.equal(true);

		done();
	});
});

describe('rmFileSync', function() {

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

	it('rmFileSync', function (done) {

		const filepath = './path/to/file.txt',
			res = rmFileSync(filepath);

		expect(res).to.equal(true);

		fs.stat(filepath, function (err) {
			expect(err).to.exist;
			done();
		});
	});

	it('rmFileSync not existing return true', function (done) {

		const filepath = './path/to/not-existing',
			res = rmFileSync(filepath);

		expect(res).to.equal(true);

		done();
	});

	it('rmFileSync returns false if not a file', function (done) {

		const filepath = './path/to',
			res = rmFileSync(filepath);

		expect(res).to.equal(false);

		done();
	});
});

describe('rmSync', function() {

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

	it('rmSync removes file', function (done) {

		const filepath = './path/to/file.txt',
			res = rmSync(filepath);

		expect(res).to.equal(true);

		fs.stat(filepath, function (err) {
			expect(err).to.exist;
			done();
		});
	});

	it('rmSync removes empty dir', function (done) {

		const dirpath = './path/to/empty-dir',
			res = rmSync(dirpath);

		expect(res).to.equal(true);

		fs.stat(dirpath, function (err) {
			expect(err).to.exist;
			done();
		});
	});

	it('rmSync removes dir recursive', function (done) {

		const dirpath = './path/to',
			res = rmSync(dirpath, true);

		expect(res).to.equal(true);

		fs.stat(dirpath, function (err) {
			expect(err).to.exist;
			done();
		});
	});

	it('rmSync not existing returns true', function (done) {

		const res = rmSync('./not-existing');

		expect(res).to.equal(true);

		done();
	});
});