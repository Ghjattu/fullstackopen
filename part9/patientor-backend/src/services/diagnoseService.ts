import diagnoses from "../../data/diagnoses";
import { Diagnose } from "../types/types";

const getDiagnose = (): Array<Diagnose> => {
    return diagnoses;
};

const diagnoseService = { getDiagnose };

export default diagnoseService;