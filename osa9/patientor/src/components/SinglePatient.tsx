import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientservice from "../services/patients";
import { getAllDiagnoses } from "../services/diagnoses";
import { Patient, Entry, Diagnosis } from "../types";
import EntryTypes from "./EntryTypes";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Button } from "@mui/material";

import CreateEntry from "./CreateEntry";

interface EntriesProps {
  entries: Entry[];
}

const SinglePatient = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [newEntry, setNewEntry] = useState<boolean>(false);
  
  useEffect(() => {
    if (id) {
      patientservice.getPatientById(id)
        .then(p => {
          setPatient(p);
        })
        .catch(error => {
          console.error(error);
        });
    }
  },[id]);


  if(!patient) return <p>Loading</p>;

  const handleButton = () => {
    setNewEntry(!newEntry);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px'}}>
        <h1>{patient.name}</h1>
        {patient.gender === "male" ? (
          <MaleIcon />
        ) : patient.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <>
            <MaleIcon />
            <FemaleIcon />
          </>
        )}
      </div>
      <h4>ssn: {patient.ssn}</h4>
      <h4>occupation: {patient.occupation}</h4>
      <Button onClick={handleButton} variant="contained">add new entry</Button>
      {newEntry === true && (
        <CreateEntry id={patient.id}/>
      )}
      <Entries entries={patient.entries}/>
      
    </div>
  );
};

const Entries = ({ entries }: EntriesProps) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    getAllDiagnoses().then(d => {
      setDiagnoses(d);
    })
    .catch(error => {
        console.error(error);
    });
  }, []);

  return (
    <div>
      <h3>entries</h3>
      {entries.map(entry => (
        <div key={entry.id} style={{ border: 'solid 1px black', marginBottom: '10px', padding: '10px'}}>
          <p>{entry.date} {entry.description}</p>
          {entry.diagnosisCodes && entry.diagnosisCodes.map(code => {
            const diagnosis = diagnoses.find(d => d.code === code);
            return (
              <p key={code}>
                {code}
                {diagnosis && (
                  <span>: {diagnosis.name}</span>
                )}
              </p>
            );
          })}
          <EntryTypes entry={entry}/>
        </div>
      ))}
    </div>
  );
};

export default SinglePatient;