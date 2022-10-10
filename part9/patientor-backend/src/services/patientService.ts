import patients from "../../data/patients";
import { Patient } from "../types/types";

const getPatients = (): Omit<Patient, 'ssn'>[] => {
    return patients.map( ({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }) );
};

const patientService = { getPatients};

export default patientService;