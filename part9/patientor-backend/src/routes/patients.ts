import express from 'express';
import patientService from "../services/patientService";

const router = express.Router();

router.get('/', (_req, res) => {
    const result = patientService.getPatients();

    res.status(200).json(result);
});

export default router;