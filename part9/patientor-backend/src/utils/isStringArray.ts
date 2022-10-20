import { isString } from "./isString";

export const isStringArray = (arr: unknown): arr is Array<string> => {
	if (!Array.isArray(arr) || Object.prototype.toString.call(arr) !== '[object Array]')
		return false;

	for (let i = 0; i < arr.length; i++)
		if (!isString(arr[i]))
			return false;

	return true;
};