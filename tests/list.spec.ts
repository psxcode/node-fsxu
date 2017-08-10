import * as chai from 'chai';
import {
	listDirNamesSync,
	listDirPathsSync,
	listFileNamesSync,
	listFilePathsSync,
	listNamesSync,
	listPathsSync
} from '../lib/list';

const expect: any = chai.expect;
const mockfs = require('mock-fs');

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

	it('should return \'undefined\' if path does not exist', function () {
		const res = listNamesSync('path/to/not-existing');

		expect(res).undefined;
	});

	it('should use current dir if path is empty', function () {
		const res = listNamesSync('');

		expect(res).instanceOf(Array);
		expect(res).length(2);
	});

	it('should return \'undefined\' if path is not a string', function () {
		const res = listNamesSync(null);

		expect(res).undefined;
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

	it('should return joined paths', function () {
		const res = listPathsSync('path/to');

		expect(res[0].startsWith('path')).true;
	});

	it('should return empty array if directory is empty', function () {
		const res = listPathsSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'undefined\' if path does not exist', function () {
		const res = listPathsSync('path/to/not-existing');

		expect(res).undefined;
	});

	it('should use current dir if path is empty', function () {
		const res = listPathsSync('');

		expect(res).instanceOf(Array);
		expect(res).length(2);
	});

	it('should return \'undefined\' if path is not a string', function () {
		const res = listPathsSync(null);

		expect(res).undefined;
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

	it('should return \'undefined\' if path does not exist', function () {
		const res = listDirNamesSync('path/to/not-existing');

		expect(res).undefined;
	});

	it('should use current dir if path is empty', function () {
		const res = listDirNamesSync('');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return \'undefined\' if path is not a string', function () {
		const res = listDirNamesSync(null);

		expect(res).undefined;
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

	it('should return joined names', function () {
		const res = listDirPathsSync('path/to');

		expect(res[0].startsWith('path')).true;
	});

	it('should return empty array if directory is empty', function () {
		const res = listDirPathsSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'undefined\' if path does not exist', function () {
		const res = listDirPathsSync('path/to/not-existing');

		expect(res).undefined;
	});

	it('should use current dir if path is empty', function () {
		const res = listDirPathsSync('');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return \'undefined\' if path is not a string', function () {
		const res = listDirPathsSync(null);

		expect(res).undefined;
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

	it('should return \'undefined\' if path does not exist', function () {
		const res = listFileNamesSync('path/to/not-existing');

		expect(res).undefined;
	});

	it('should use current dir if path is empty', function () {
		const res = listFileNamesSync('');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return \'undefined\' if path is not a string', function () {
		const res = listFileNamesSync(null);

		expect(res).undefined;
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

	it('should return joined names', function () {
		const res = listFilePathsSync('path/to');

		expect(res[0].startsWith('path')).true;
	});

	it('should return empty array if directory is empty', function () {
		const res = listFilePathsSync('path/to/empty-dir');

		expect(res).instanceOf(Array);
		expect(res).empty;
	});

	it('should return \'undefined\' if path does not exist', function () {
		const res = listFilePathsSync('path/to/not-existing');

		expect(res).undefined;
	});

	it('should use current dir if path is empty', function () {
		const res = listFilePathsSync('');

		expect(res).instanceOf(Array);
		expect(res).length(1);
	});

	it('should return \'undefined\' if path is not a string', function () {
		const res = listFilePathsSync(null);

		expect(res).undefined;
	});
});
