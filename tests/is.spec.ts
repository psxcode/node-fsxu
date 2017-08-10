import * as chai from 'chai';
import {isFileSync, isDirSync} from "../lib/is";

const expect: any = chai.expect;
const mockfs = require('mock-fs');

chai.use(require('chai-fs'));

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

	describe('isFileSync', function () {

		it('returns true if path is a file', function () {
			const filepath = 'path/to/file.txt';

			expect(filepath).file('file should exist');
			expect(isFileSync(filepath)).true;
		});

		it('returns false if path is not a file', function () {
			const filepath = 'path/to';

			expect(filepath).path('path should exist');
			expect(isFileSync(filepath)).false;
		});

		it('returns false if path is not a file', function () {
			const filepath = 'invalid';

			expect(filepath).not.path('path should not exist');
			expect(isFileSync(filepath)).false;
		});

		it('should return false if path is empty', function () {
			const filepath = '';

			expect(isFileSync(filepath)).false;
		});

		it('returns false if path is not a string', function () {
			const filepath = null;

			expect(isFileSync(filepath)).false;
		});
	});

	describe('isDirSync', function () {

		it('returns true if path is a directory', function () {
			const dirpath = 'path/to';

			expect(dirpath).directory('directory should exist');
			expect(isDirSync(dirpath)).true;
		});

		it('returns false if path is not a directory', function () {
			const dirpath = 'path/to/file.txt';

			expect(dirpath).path('path should exist');
			expect(isDirSync(dirpath)).false;
		});

		it('returns false if path is not a file', function () {
			const dirpath = 'invalid';

			expect(dirpath).not.path('path should not exist');
			expect(isDirSync(dirpath)).false;
		});

		it('should resolve to cuurent dir if path is empty', function () {
			const dirpath = '';

			expect(dirpath).path('path should exist');
			expect(isDirSync(dirpath)).true;
		});

		it('returns false if path is not a string', function () {
			const dirpath = null;

			expect(isDirSync(dirpath)).false;
		});
	});
});
