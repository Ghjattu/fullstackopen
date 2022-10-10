import express from "express";
import diagnoseService from "../services/diagnoseService";

const router = express.Router();

router.get('/', (_req, res) => {
    const result = diagnoseService.getDiagnose();

    res.status(200).json(result);
});

export default router;