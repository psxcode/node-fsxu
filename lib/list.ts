import {readdirSync} from 'fs';
import {resolve, join} from 'path';
import {isDirSync, isFileSync} from "./is";
import {isString} from "./util";

export function listFilePathsSync(path: string): string[] | null {
	if(isString(path)) {
		path = resolve(path);
		const entries = listFileNamesSync(path);
		return Array.isArray(entries) ? entries.map(e => join(path, e)) : entries;
	}
	return null;
}

export function listFileNamesSync(path: string): string[] | null {
	if (isString(path)) {
		path = resolve(path);

		try {
			return readdirSync(path).filter(e => isFileSync(join(path, e)));
		} catch (e) {
		}
	}
	return null;
}

export function listDirPathsSync(path: string): string[] | null {
	if(isString(path)) {
		path = resolve(path);
		const entries = listDirNamesSync(path);
		return Array.isArray(entries) ? entries.map((e: string) => join(path, e)) : entries;
	}
	return null;
}

export function listDirNamesSync(path: string): string[] | null {
	if (isString(path)) {
		path = resolve(path);

		try {
			return readdirSync(path).filter((e: string) => isDirSync(join(path, e)));
		} catch (e) {
		}
	}
	return null;
}

export function listPathsSync(path: string): string[] | null {
	if(isString(path)) {
		path = resolve(path);
		const entries = listNamesSync(path);
		return Array.isArray(entries) ? entries.map((e: string) => join(path, e)) : entries;
	}
	return null;
}

export function listNamesSync(path: string): string[] | null {
	if (isString(path)) {
		path = resolve(path);

		try {
			return readdirSync(path);
		} catch (e) {
		}
	}
	return null;
}
