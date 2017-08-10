import {readdirSync} from 'fs';
import {join, resolve} from 'path';
import {isDirSync, isFileSync} from "./is";

/**
 * Returns filenames array,
 * joined with path provided,
 * found in directory provided,
 * or undefined if cannot read the directory
 * @param {string} path
 * @returns {string[] | undefined}
 */
export function listFilePathsSync(path: string): string[] | undefined {
	const entries = listFileNamesSync(path);
	return Array.isArray(entries) ? entries.map(e => join(path, e)) : void 0;
}

/**
 * Returns filenames array,
 * found in a directory provided,
 * or undefined if cannot read the directory
 * @param {string} path
 * @returns {string[] | undefined}
 */
export function listFileNamesSync(path: string): string[] | undefined {

	try {
		path = resolve(path);
		return readdirSync(path).filter(e => isFileSync(join(path, e)));
	} catch (e) {
	}

	return void 0;
}

/**
 * Returns directories names array,
 * joined with path provided,
 * found in directory provided,
 * or undefined if cannot read the directory
 * @param {string} path
 * @returns {string[]}
 */
export function listDirPathsSync(path: string): string[] | undefined {
	const entries = listDirNamesSync(path);
	return Array.isArray(entries) ? entries.map(e => join(path, e)) : void 0;
}

/**
 * Returns directories names array,
 * found in a directory provided,
 * or undefined if cannot read the directory
 * @param {string} path
 * @returns {string[]}
 */
export function listDirNamesSync(path: string): string[] | undefined {

	try {
		path = resolve(path);
		return readdirSync(path).filter((e: string) => isDirSync(join(path, e)));
	} catch (e) {
	}

	return void 0;
}

/**
 * Returns entries array (returned by fs.readdir),
 * joined with path provided,
 * found in directory provided,
 * or undefined if cannot read the directory
 * @param {string} path
 * @returns {string[]}
 */
export function listPathsSync(path: string): string[] | undefined {
	const entries = listNamesSync(path);
	return Array.isArray(entries) ? entries.map(e => join(path, e)) : entries;
}

/**
 * Returns entries array (returned by fs.readdir),
 * found in a directory provided,
 * or undefined if cannot read the directory
 * @param {string} path
 * @returns {string[]}
 */
export function listNamesSync(path: string): string[] | undefined {

	try {
		path = resolve(path);
		return readdirSync(path);
	} catch (e) {
	}

	return void 0;
}
