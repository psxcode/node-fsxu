import {unlinkSync, rmdirSync} from 'fs';
import {resolve, join} from 'path';
import {isDirSync, isFileSync} from "./is";
import {listPathsSync} from "./list";
import {isString, isValidString} from "./util";

export function rmFileSync(path: string): boolean {
	if (isValidString(path)) {
		try {
			return unlinkSync(path), true;
		} catch (e) {
			return e && e.code === 'ENOENT';
		}
	}
	return false;
}

export function rmDirSync(path: string): boolean {
	if (isString(path)) {
		path = resolve(path);

		if (isDirSync(path)) {
			(listPathsSync(path) || []).forEach(rmSync)
		}

		try {
			return rmdirSync(path), true;
		} catch (e) {
			return e && e.code === 'ENOENT';
		}
	}
	return false;
}

export function rmSync(path: string): boolean {
	if (isString(path)) {
		path = resolve(path);
		return isDirSync(path) ? rmDirSync(path) : rmFileSync(path);
	}
	return false;
}
