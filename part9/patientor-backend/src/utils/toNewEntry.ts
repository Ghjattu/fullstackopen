import {
	EntryType,
	EntryWithoutId,
	HealthCheckEntry,
	HealthCheckRating,
	HospitalEntry,
	OccupationalHealthcareEntry
} from "../types/types";
import { isString } from "./isString";
import { isDate } from "./isDate";
import { isStringArray } from "./isStringArray";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (rate: any): rate is HealthCheckRating => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(HealthCheckRating).includes(rate);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (type: any): type is EntryType => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(EntryType).includes(type);
};

const parseType = (type: unknown): EntryType => {
	if (!type || !isString(type) || !isEntryType(type))
		throw new Error('Incorrect or missing type');

	return type;
};

const parseDescription = (description: unknown): string => {
	if (!description || !isString(description))
		throw new Error('Incorrect or missing description');

	return description;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date))
		throw new Error('Incorrect or missing date');

	return date;
};

const parseSpecialist = (specialist: unknown): string => {
	if (!specialist || !isString(specialist))
		throw new Error('Incorrect or missing specialist');

	return specialist;
};

const parseDiagnosisCodes = (codes: unknown): string[] => {
	if (!isStringArray(codes))
		throw new Error('Incorrect or missing diagnosis codes');

	return codes;
};

const parseHealthCheckRating = (rate: unknown): HealthCheckRating => {
	if (!rate || !isRating(rate))
		throw new Error('Incorrect or missing rate');

	return rate;
};

const parseCriteria = (criteria: unknown): string => {
	if (!criteria || !isString(criteria))
		throw new Error('Incorrect or missing criteria');

	return criteria;
};

const parseEmployerName = (name: unknown): string => {
	if (!name || !isString(name))
		throw new Error('Incorrect or missing employer name');

	return name;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): EntryWithoutId => {
	const type = parseType(object.type);
	const description = parseDescription(object.description);
	const date = parseDate(object.date);
	const specialist = parseSpecialist(object.specialist);
	const diagnosisCodes = object.diagnosisCodes ? parseDiagnosisCodes(object.diagnosisCodes) : undefined;

	let obj1: Omit<HealthCheckEntry, "id">;
	let obj2: Omit<HospitalEntry, "id">;
	let obj3: Omit<OccupationalHealthcareEntry, "id">;
	if (type === EntryType.HealthCheck) {
		const healthCheckRating = parseHealthCheckRating(object.healthCheckRating);

		obj1 = { type, description, date, specialist, diagnosisCodes, healthCheckRating };

		return obj1;
	} else if (type === EntryType.Hospital) {
		const discharge = {
			date: parseDate(object.discharge.date),
			criteria: parseCriteria(object.discharge.criteria)
		};

		obj2 = { type, description, date, specialist, diagnosisCodes, discharge };

		return obj2;
	} else {
		const employerName = parseEmployerName(object.employerName);
		const sickLeave = object.sickLeave ? {
			startDate: parseDate(object.sickLeave.startDate),
			endDate: parseDate(object.sickLeave.endDate)
		} : undefined;
		obj3 = { type, description, date, specialist, diagnosisCodes, employerName, sickLeave };

		return obj3;
	}
};

export default toNewEntry;