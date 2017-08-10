import {mkdirSync} from 'fs';
import {dirname, resolve} from 'path';
import {listPathsSync} from "./list";
import {isDirSync} from "./is";
import {rmSync} from "./rm";
import {isString} from "./util";

const _0777 = parseInt('0777', 8);

export function makeDirSync(path: string, mode: number = _0777): boolean {
	if (isString(path)) {
		path = resolve(path);

		try {
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
	return false;
}

export function emptyDirSync(path: string): boolean {
	(listPathsSync(path) || []).forEach(rmSync);
	return isDirSync(path) || makeDirSync(path);
}
