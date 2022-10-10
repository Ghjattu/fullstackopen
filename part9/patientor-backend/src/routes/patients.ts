import express from 'express';
import patientService from "../services/patientService";
import toNewPatient from "../utils/toNewPatient";

const router = express.Router();

router.get('/', (_req, res) => {
    const result = patientService.getPatients();

    res.status(200).json(result);
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const returnedPatient = patientService.addPatient(newPatient);
        res.status(201).json(returnedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});


export default router;