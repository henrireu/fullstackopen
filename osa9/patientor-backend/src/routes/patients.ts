import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
import toNewEntry from '../utilsEntry';

//import { NewEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  const patientId = req.params.id;
  try {
    const newEntry = toNewEntry(req.body);
    if (newEntry) {
      const addedEntry = patientService.addEntryToPatient(patientId, newEntry);
      res.json(addedEntry);
    }
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
  
});

router.post('/', (req, res) => {
  //const { name, dateOfBirth, gender, occupation, ssn } = req.body;

  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch {
    res.sendStatus(400);
  }
  /*try {
    const addedEntry = patientService.addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
  });
    res.json(addedEntry);
  } catch {
    res.status(400);
  }*/
});

export default router;