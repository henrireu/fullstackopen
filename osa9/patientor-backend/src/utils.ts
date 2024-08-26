import { NewPatientEntry, Gender } from "./types";

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  console.log(object);
  
  if( !object || typeof object !==  'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      //testi
      entries: []
    };

    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || occupation.length < 1) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || ssn.length < 1) {
    throw new Error('Incorrect or missing name');
  }
  return ssn;
};

const parseName = (name: unknown): string => {
  if (!isString(name) || name.length < 1) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export default toNewPatientEntry;