import axios from "axios";
import { Patient, PatientFormValues, NewHospitalEntry, NewHealthCheckEntry, NewOccupationalHealthCareEntry } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatientById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};
 
const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (id:string, object: NewHospitalEntry | NewHealthCheckEntry | NewOccupationalHealthCareEntry) => {
  const { data } = await axios.post<NewHospitalEntry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  console.log(data);

  return data;
};

export default {
  getAll, create, getPatientById, createEntry
};

