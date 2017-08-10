export function isString(s: any): boolean {
	return typeof s === 'string';
}

export function isValidString(s: any): boolean {
	return s && typeof s === 'string';
}
