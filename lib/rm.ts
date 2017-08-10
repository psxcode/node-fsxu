import {rmdirSync, unlinkSync} from 'fs';
import {resolve} from 'path';
import {isDirSync} from "./is";
import {listPathsSync} from "./list";

export function rmFileSync(path: string): boolean {
	try {
		return unlinkSync(path), true;
	} catch (e) {
		return e && e.code === 'ENOENT';
	}
}

export function rmDirSync(path: string): boolean {

	try {
		path = resolve(path);
		(listPathsSync(path) || []).forEach(rmSync);
		return rmdirSync(path), true;
	} catch (e) {
		return e && e.code === 'ENOENT';
	}
}

export function rmSync(path: string): boolean {
	return isDirSync(path) ? rmDirSync(path) : rmFileSync(path);
}
