import express from 'express';
import patientService from "../services/patientService";
import toNewPatient from "../utils/toNewPatient";
import toNewEntry from "../utils/toNewEntry";

const router = express.Router();

router.get('/', (_req, res) => {
    const result = patientService.getPatients();

    res.status(200).json(result);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const result = patientService.getPatientById(id);

    if (result === undefined) {
        res.status(404).json({ error: 'Not Found'});
        return;
    }
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

router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = toNewEntry(req.body);
        const returnedEntry = patientService.addEntry(newEntry, req.params.id);
        res.status(201).json(returnedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});


export default router;