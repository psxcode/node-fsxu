import {statSync} from 'fs';
import {resolve} from 'path';

/**
 * Returns path is a file
 * @param {string} path
 * @returns {boolean}
 */

export function isFileSync(path: string): boolean {

	try {
		return statSync(path).isFile();
	} catch (e) {
	}

	return false;
}

/**
 * Resolves path with path.resolve and returns if path is a directory
 * @param {string} path
 * @returns {boolean}
 */

export function isDirSync(path: string): boolean {

	try {
		path = resolve(path);
		return statSync(path).isDirectory();
	} catch (e) {
	}

	return false;
}
