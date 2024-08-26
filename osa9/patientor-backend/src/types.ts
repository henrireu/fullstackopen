export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

/*export interface DiagnosyEntry {
  code: string;
  name: string;
  latin?: string;
}*/

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Diagnosis['code'][];
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}


export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

// Define special omit for unions
//type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
//type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}


export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export type NewEntry = Omit<Entry, 'id'>;

export type NewPatientEntry = Omit<Patient, 'id'>;

export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
export type NewOccupationalEntry = Omit<OccupationalHealthcareEntry, 'id'>;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;