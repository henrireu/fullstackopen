//import { NewEntry } from "./types";
import { NewHospitalEntry, NewOccupationalEntry, NewHealthCheckEntry, Diagnosis, HealthCheckRating } from "./types";

const toNewEntry = (object: unknown) => {

  if( !object || typeof object !==  'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('type' in object) {
    if (object.type === "Hospital") {
      return toNewHospitalEntry(object);
    } if (object.type === "OccupationalHealthcare") {
      return toNewOccupationalEntry(object);
    } if (object.type === "HealthCheck") {
      return toNewHealthCheckEntry(object);
    }
    return null;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const toNewHealthCheckEntry = (object: unknown): NewHealthCheckEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const obj = object as {
    date: unknown;
    type: unknown;
    specialist: unknown;
    description: unknown;
    healthCheckRating: unknown;
    diagnosisCodes?: unknown;
  };

  if ('date' in obj && 'type' in obj && 'specialist' in obj && 'description' in obj && 'healthCheckRating' in obj) {
    const newEntry: NewHealthCheckEntry = {
      date: parseDate(obj.date),
      type: "HealthCheck",
      specialist: parseSpecialist(obj.specialist),
      description: parseDescription(obj.description),
      healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
      ...(obj.diagnosisCodes !== undefined && { diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes)})
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewOccupationalEntry = (object: unknown): NewOccupationalEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const obj = object as {
    date: unknown;
    type: unknown;
    specialist: unknown;
    description: unknown;
    employerName: unknown;
    sickLeave?: unknown;
    diagnosisCodes?: unknown;
  };

  if ('date' in obj && 'type' in obj && 'specialist' in obj && 'description' in obj && 'employerName' in obj) {
    const newEntry: NewOccupationalEntry = {
      date: parseDate(obj.date),
      type: "OccupationalHealthcare",
      specialist: parseSpecialist(obj.specialist),
      description: parseDescription(obj.description),
      employerName: parseEmployerName(obj.employerName),
      ...(obj.diagnosisCodes !== undefined && { diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes) }),
      ...(obj.sickLeave !== undefined && { sickLeave: parseSickLeave(obj.sickLeave) })
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewHospitalEntry = (object: unknown): NewHospitalEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  const obj = object as {
    date: unknown;
    type: unknown;
    specialist: unknown;
    description: unknown;
    discharge: unknown;
    diagnosisCodes?: unknown;
  };

  if ('date' in obj && 'type' in obj && 'specialist' in obj && 'description' in obj && 'discharge' in obj) {
    const newEntry: NewHospitalEntry = {
      date: parseDate(obj.date),
      type: "Hospital",
      specialist: parseSpecialist(obj.specialist),
      description: parseDescription(obj.description),
      discharge: parseDischarge(obj.discharge),
      ...(obj.diagnosisCodes !== undefined && { diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes) })
    };
    return newEntry;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthcheckrating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const isHealthCheckRating = (param: unknown): param is HealthCheckRating => {
  return typeof param === 'number' && Object.values(HealthCheckRating).includes(param);
};

const parseSickLeave = (sickLeave: unknown): { startDate: string; endDate: string } => {
  if (typeof sickLeave !== 'object' || sickLeave === null || !('startDate' in sickLeave) || !('endDate' in sickLeave)) {
    throw new Error('Incorrect or missing sickLeave object');
  }

  const sickLeaveObj = sickLeave as { startDate: unknown; endDate: unknown };

  if (!isString(sickLeaveObj.startDate) || !isDate(sickLeaveObj.startDate)) {
    throw new Error('Incorrect sickLeave startDate: ' + sickLeaveObj.startDate);
  }

  if (!isString(sickLeaveObj.endDate) || !isDate(sickLeaveObj.endDate)) {
    throw new Error('Incorrect sickLeave endDate: ' + sickLeaveObj.endDate);
  }

  return {
    startDate: sickLeaveObj.startDate,
    endDate: sickLeaveObj.endDate
  };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName) || employerName.length < 1) {
    throw new Error('Incorrect or missing employerName: ' + employerName);
  }
  return employerName;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> => {
  if (!codes) {
    return [];
  }

  if (Array.isArray(codes) && codes.every(code => isString(code))) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return codes as Array<Diagnosis['code']>;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    throw new Error('Incorrect or missing diagnosisCodes: ' + codes);
  }
};

/*const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};*/

interface Discharge {
  date: string;
  criteria: string
}

const parseDischarge = (discharge: unknown): Discharge => {
  if (typeof discharge !== 'object' || discharge === null || !('date' in discharge) || !('criteria' in discharge)) {
    throw new Error('Incorrect or missing discharge object');
  }

  const dischargeObj = discharge as { date: unknown; criteria: unknown };

  if (!isString(dischargeObj.date) || !isDate(dischargeObj.date)) {
    throw new Error('Incorrect discharge date: ' + dischargeObj.date);
  }

  if (!isString(dischargeObj.criteria) || dischargeObj.criteria.length < 1) {
    throw new Error('Incorrect or missing discharge criteria: ' + dischargeObj.criteria);
  }

  return {
    date: dischargeObj.date,
    criteria: dischargeObj.criteria
  };
};

const parseDescription = (description: unknown): string => {
  if (!isString(description) || description.length < 1) {
    throw new Error('Incorrect or missing description: ' + description);
  }
  return description;

};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist) || specialist.length < 1) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export default toNewEntry;