import diagnoses from "../../data/diagnosesdata";

//import { DiagnosyEntry } from "../types";
import { Diagnosis } from "../types";

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getEntries
}; 