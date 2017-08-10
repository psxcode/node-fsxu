import {mkdirSync} from 'fs';
import {dirname, resolve} from 'path';
import {listPathsSync} from "./list";
import {isDirSync} from "./is";
import {rmSync} from "./rm";

const _0777 = parseInt('0777', 8);

/**
 * Recursively creates directories (mkDir with mode provided or 0777) up to a defined path (resolved with path.resolve),
 * @param {string} path
 * @param {number} mode
 * @returns {boolean}
 */
export function makeDirSync(path: string, mode: number = _0777): boolean {

	try {
		path = resolve(path);
		return mkdirSync(path, mode), true;
	} catch (e) {
		switch (e.code) {
			//part of the path does not exist
			case 'ENOENT':
				const dp = dirname(path);
				return dp !== path && makeDirSync(dp, mode) && makeDirSync(path, mode);
			//path already exist
			default:
				return isDirSync(path);
		}
	}
}

/**
 * Empties directory at path or creates new directories
 * @param {string} path
 * @returns {boolean}
 */
export function emptyDirSync(path: string): boolean {
	(listPathsSync(path) || []).forEach(rmSync);
	return makeDirSync(path);
}
