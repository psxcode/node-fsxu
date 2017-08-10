import * as chai from 'chai';
import * as path from 'path';
import {findUpSync} from '../lib/findup';

const expect: any = chai.expect;
const mockfs = require('mock-fs');

describe('findUpSync', function () {

	beforeEach(function () {
		mockfs({
			'root': {
				'node_modules': {
					'fsxu': {
						'lib': {},
						'package.json': ''
					}
				},
				'package.json': ''
			},
			'file': ''
		});
	});

	afterEach(function () {
		mockfs.restore();
	});

	it('finds a file starting from provided path', function () {
		const dirpath = './root/node_modules/fsxu/lib',
			filename = 'package.json',
			actualPath = findUpSync(filename, dirpath),
			expectedPath = path.resolve('./root/node_modules/fsxu');

		expect(actualPath).equal(expectedPath);
	});

	it('finds a file in the same directory starting from provided path', function () {
		const dirpath = './root/node_modules/fsxu',
			filename = 'package.json',
			actualPath = findUpSync(filename, dirpath),
			expectedPath = path.resolve('./root/node_modules/fsxu');

		expect(actualPath).equal(expectedPath);
	});

	it('finds a file starting from __dirname if path is not provided', function () {
		const filename = 'file',
			actualPath = findUpSync(filename),
			expectedPath = path.resolve('./');

		expect(actualPath).equal(expectedPath);
	});

	it('returns undefined if not found', function () {
		const dirpath = './root/node_modules/fsxu',
			filename = 'not-found',
			actualPath = findUpSync(filename, dirpath);

		expect(actualPath).undefined;
	});

	it('returns undefined filename is not a string', function () {
		const dirpath = './root/node_modules/fsxu',
			filename = null,
			actualPath = findUpSync(filename, dirpath);

		expect(actualPath).undefined;
	});

	it('should skip found file if resulting path passes \'exclude\' test', function () {
		const dirpath = './root/node_modules/fsxu',
			filename = 'package.json',
			actualPath = findUpSync(filename, dirpath, /node_modules/),
			expectedPath = path.resolve('./root');

		expect(actualPath).equal(expectedPath);
	});
});
