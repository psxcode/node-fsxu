import {statSync} from 'fs';
import {dirname, join, resolve} from 'path';

/**
 * Returns resolved path containing file with name provided,
 * starting at path defined,
 * excluding paths that pass excludePath test,
 * or returns undefined if not found
 * @param {string} name
 * @param {string} path
 * @param {RegExp} excludePath
 * @returns {string | undefined}
 */
export function findUpSync(name: string, path: string = __dirname, excludePath?: RegExp): string | undefined {

	path = resolve(path);

	if (excludePath && excludePath.test(path)) {
		return upnext();
	}

	try {
		statSync(join(path, name));
		return path;
	} catch (e) {
		switch (e.code) {
			case 'ENOENT':
				return upnext();
		}
	}

	return void 0;

	function upnext(): string | undefined {
		const dp = dirname(path);
		return (dp === path) ? void 0 : findUpSync(name, dp, excludePath);
	}
}
