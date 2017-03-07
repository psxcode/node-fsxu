const path = require('path'),
	expect = require('chai').expect,
	mockfs = require('mock-fs'),
	findFileUpSync = require('../lib/findup').findFileUpSync;

describe('findFileUpSync', function () {

	beforeEach(function () {
		mockfs({
			'root': {
				'path/to': {
					'file.log': 'content',
					'empty-dir': {}
				},
				'file.txt': 'content'
			},
			'file.jpg': 'content'
		});
	});

	afterEach(function () {
		mockfs.restore();
	});

	it('finds a file starting from provided path', function () {
		const dirpath = './root/path/to/empty-dir',
			filename = 'file.txt',
			actualPath = findFileUpSync(filename, dirpath),
			expectedPath = path.resolve('root');

		expect(actualPath).equal(expectedPath);
	});

	it('finds a file starting from __dirname if path is not provided', function () {
		const dirpath = './root/path/to/empty-dir',
			filename = 'file.jpg',
			actualPath = findFileUpSync(filename),
			expectedPath = path.resolve('./');

		expect(actualPath).equal(expectedPath);
	});

	it('finds a file starting from __dirname if provided path is not a string', function () {
		const dirpath = {},
			filename = 'file.jpg',
			actualPath = findFileUpSync(filename, dirpath),
			expectedPath = path.resolve('./');

		expect(actualPath).equal(expectedPath);
	});

	it('returns null if not found', function () {
		const dirpath = './root/path/to/empty-dir',
			filename = 'file.png',
			actualPath = findFileUpSync(filename, dirpath);

		expect(actualPath).null;
	});

	it('returns null filename is not string', function () {
		const dirpath = './root/path/to/empty-dir',
			filename = {},
			actualPath = findFileUpSync(filename, dirpath);

		expect(actualPath).null;
	});
});