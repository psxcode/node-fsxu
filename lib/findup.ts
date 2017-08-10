import {statSync} from 'fs';
import {dirname, join, resolve} from 'path';
import {isValidString} from "./util";

export function findUpSync(name: string, path: string = __dirname, exclude?: RegExp): string | null {

	path = resolve(path);

	if (exclude && exclude.test(path)) {
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

	return null;

	function upnext(): string | null {
		const dp = dirname(path);
		return (dp === path) ? null : findUpSync(name, dp, exclude);
	}
}
