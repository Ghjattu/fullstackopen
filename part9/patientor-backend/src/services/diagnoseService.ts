import diagnoses from "../../data/diagnoses";
import { Diagnosis } from "../types/types";

const getDiagnose = (): Array<Diagnosis> => {
    return diagnoses;
};

const diagnoseService = { getDiagnose };

export default diagnoseService;