import {statSync} from 'fs';
import {resolve} from 'path';
import {isValidString, isString} from "./util";

export function isFileSync(path: string): boolean {
	if (isValidString(path)) {
		try {
			return statSync(path).isFile();
		} catch (e) {
		}
	}

	return false;
}

export function isDirSync(path: string): boolean {
	if (isString(path)) {
		path = resolve(path);
		try {
			return statSync(path).isDirectory();
		} catch (e) {
		}
	}

	return false;
}
