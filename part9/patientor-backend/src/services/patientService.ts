import patients from "../../data/patients";
import { Entry, EntryWithoutId, newPatientType, Patient } from "../types/types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation, ssn, entries }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
		ssn,
		entries
	}));
};

const getPatientById = (id: string): Patient | undefined => {
	return patients.find(patient => patient.id === id);
};

const addPatient = (patient: newPatientType): Patient => {
	const newPatient = {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		id: String(uuid()),
		...patient,
	};

	patients.push(newPatient);
	return newPatient;
};

const addEntry = (entry: EntryWithoutId, id: string): Entry => {
	const newEntry = {
		id: String(uuid()),
		...entry,
	};

	patients.forEach(patient => {
		if (patient.id === id) {
			patient.entries.push(newEntry);
		}
	});
	return newEntry;
};

const patientService = { getPatients, getPatientById, addPatient, addEntry };

export default patientService;