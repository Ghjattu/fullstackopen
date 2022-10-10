import patients from "../../data/patients";
import { newPatientType, Patient } from "../types/types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
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

const patientService = { getPatients, addPatient };

export default patientService;