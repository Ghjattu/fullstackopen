import { newPatientType, Gender } from '../types/types';
import { isString } from "./isString";
import { isDate } from "./isDate";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(gender);
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name))
		throw new Error('Incorrect or missing name');

	return name;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date))
		throw new Error('Incorrect or missing date');

	return date;
};

const parseSSN = (ssn: unknown): string => {
	if (!ssn || !isString(ssn))
		throw new Error('Incorrect or missing social security number');

	return ssn;
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender))
		throw new Error('Incorrect or missing gender');

	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation))
		throw new Error('Incorrect or missing occupation');

	return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): newPatientType => {
	return {
		name: parseName(object.name),
		dateOfBirth: parseDate(object.dateOfBirth),
		ssn: parseSSN(object.ssn),
		gender: parseGender(object.gender),
		occupation: parseOccupation(object.occupation),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		entries: object.entries
	};
};

export default toNewPatient;