import patients from "../../data/patientsdata";
import { v1 as uuid } from 'uuid';

import { Patient, NonSensitivePatientEntry, NewPatientEntry, NewHospitalEntry, NewOccupationalEntry, NewHealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types"; 

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
}; 

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id: string = uuid();
  const newPatientEntry = {
    ...entry,
    id: id
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntryToPatient = (patientId: string, entry: NewHospitalEntry | NewOccupationalEntry | NewHealthCheckEntry): HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry | undefined => {
  const patient = patients.find(p => p.id === patientId);

  if (patient) {
    if (entry.type === "Hospital" || entry.type === "OccupationalHealthcare" || entry.type === "HealthCheck") {
      const id = uuid();
      const newEntry = {
        id: id,
        ...entry
      };
      patient.entries.push(newEntry);
      return newEntry;
    }
  }
  return undefined;
};
 
export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatient,
  addEntryToPatient
};