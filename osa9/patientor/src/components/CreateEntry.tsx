import { useState } from "react";
import { InputLabel, Select, MenuItem, SelectChangeEvent, Button, TextField, List, ListItem, ListItemText, Alert, Stack } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import patientservice from "../services/patients";
import { NewHospitalEntry, NewHealthCheckEntry, HealthCheckRating, NewOccupationalHealthCareEntry } from "../types";

interface CreateEntryProps {
  id: string;
}

const CreateEntry: React.FC<CreateEntryProps> = ( {id} ) => {
  const [type, setType] = useState<string>('');

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();

    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      setType(value);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
      <InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
      <Select
        label="type"
        value={type}
        onChange={onTypeChange}
        fullWidth
      >
        <MenuItem value="hospital">
          Hospital
        </MenuItem>
        <MenuItem value="healthcheck">
          HealthCheck
        </MenuItem>
        <MenuItem value="occupational">
          Occupational HealthCare
        </MenuItem>
      </Select>
      {type === "hospital" ? (
        <Hospital id={id}/>
      ) : type === "healthcheck" ? (
        <HealthCheck id={id}/>
      ) : type ==="occupational" ? (
        <Occupational id={id} />
      ) : (
        <></>
      )}
    </div>
  );
};

const Hospital: React.FC<CreateEntryProps> = ({ id }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [description, setDescription] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [diagnosisCode, setDiagnosisCode] = useState<string>('');
  // tästä eteenpäin special entryt
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(dayjs());
  const [criteria, setCriteria] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (date && dischargeDate) {
      const formattedDate = date ? date.format('YYYY-MM-DD') : '';
      const formattedDischargeDate = dischargeDate ? dischargeDate.format('YYYY-MM-DD') : '';

      const discharge = {
        date: formattedDischargeDate,
        criteria: criteria
      };

      const hospitalEntry: NewHospitalEntry = {
        date: formattedDate,
        type: "Hospital",
        specialist: specialist,
        description: description,
        discharge: discharge,
        ...(diagnosisCodes.length > 0 && { diagnosisCodes: diagnosisCodes }),
      };
    
      try {
        await patientservice.createEntry(id, hospitalEntry);
      } catch (error) {
        console.error('Error creating entry:', error);
        if (error.response.data) {
          setErrorMessage(error.response.data);
          setTimeout(() => {
            setErrorMessage('');
          }, 3000);
        }
      }
      //patientservice.createEntry(id, hospitalEntry);
    }
  };

  const handleAddCode = () => {
    setDiagnosisCodes(diagnosisCodes.concat(diagnosisCode));
    setDiagnosisCode('');
  };
  
  return (
    <div>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
          />
        </LocalizationProvider>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth 
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <div style={{display: 'flex', gap:"10px"}}>
          <TextField
            label="DiagnosisCode"
            fullWidth 
            value={diagnosisCode}
            onChange={({ target }) => setDiagnosisCode(target.value)}
          />
          <Button onClick={handleAddCode} variant="contained">Add DiagnosisCode</Button>
        </div>
        <div>
          {diagnosisCodes.length > 0 && (
            <h4>DiagnosisCodes</h4>
          )}
          <List>
            {diagnosisCodes.map((code) => (
              <ListItem key={code}>
                <ListItemText primary={code} />
              </ListItem>
            ))}
          </List>
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Discharge date"
            value={dischargeDate}
            onChange={(newDate) => setDischargeDate(newDate)}
          />
        </LocalizationProvider>
        <TextField
          label="Discharge criteria"
          fullWidth 
          value={criteria}
          onChange={({ target }) => setCriteria(target.value)}
        />
        <Button size="medium" onClick={handleSubmit} variant="contained">Create</Button>
      </form>
      {errorMessage !== "" && (
        <Alert severity="error">{errorMessage}</Alert>
      )}
    </div>
    );
};

const HealthCheck: React.FC<CreateEntryProps> = ({ id }) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
  
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [description, setDescription] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [diagnosisCode, setDiagnosisCode] = useState<string>('');
    // tästä eteenpäin special entryt
    const [rating, setRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      if (date) {
        const formattedDate = date ? date.format('YYYY-MM-DD') : '';
  
        const healthCheckEntry: NewHealthCheckEntry = {
          date: formattedDate,
          type: "HealthCheck",
          specialist: specialist,
          description: description,
          healthCheckRating: rating,
          ...(diagnosisCodes.length > 0 && { diagnosisCodes: diagnosisCodes }),
        };
      
        try {
          await patientservice.createEntry(id, healthCheckEntry);
        } catch (error) {
          console.error('Error creating entry:', error);
          if (error.response.data) {
            setErrorMessage(error.response.data);
            setTimeout(() => {
              setErrorMessage('');
            }, 3000);
          }
        }
      }
    };
  
    const handleAddCode = () => {
      setDiagnosisCodes(diagnosisCodes.concat(diagnosisCode));
      setDiagnosisCode('');
    };

    const onRatingChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        const value = parseInt(event.target.value, 10) as HealthCheckRating;
        setRating(value);
      };
    
    return (
      <div>
        <form style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </LocalizationProvider>
          <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth 
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <div style={{display: 'flex', gap:"10px"}}>
            <TextField
              label="DiagnosisCode"
              fullWidth 
              value={diagnosisCode}
              onChange={({ target }) => setDiagnosisCode(target.value)}
            />
            <Button onClick={handleAddCode} variant="contained">Add DiagnosisCode</Button>
          </div>
          <div>
            {diagnosisCodes.length > 0 && (
              <h4>DiagnosisCodes</h4>
            )}
            <List>
              {diagnosisCodes.map((code) => (
                <ListItem key={code}>
                  <ListItemText primary={code} />
                </ListItem>
              ))}
            </List>
          </div>
          <InputLabel style={{ marginTop: 20 }}>Health rating</InputLabel>
          <Select
          label="rating"
          value={rating.toString()} // Ensure the value is a string
          onChange={onRatingChange}
          fullWidth
        >
          <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
          <MenuItem value={HealthCheckRating.LowRisk}>LowRisk</MenuItem>
          <MenuItem value={HealthCheckRating.HighRisk}>HighRisk</MenuItem>
          <MenuItem value={HealthCheckRating.CriticalRisk}>CriticalRisk</MenuItem>
        </Select>
          <Button size="medium" onClick={handleSubmit} variant="contained">Create</Button>
        </form>
        {errorMessage !== "" && (
          <Alert severity="error">{errorMessage}</Alert>
        )}
      </div>
      );
  };

  const Occupational: React.FC<CreateEntryProps> = ({ id }) => {
    const [errorMessage, setErrorMessage] = useState<string>('');
  
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [description, setDescription] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [diagnosisCode, setDiagnosisCode] = useState<string>('');
    // tästä eteenpäin special entryt
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [employerName, setEmployerName] = useState<string>('');
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      
      if (date) {
        const formattedDate = date ? date.format('YYYY-MM-DD') : '';
  
        const occupationalEntry: NewOccupationalHealthCareEntry = {
          date: formattedDate,
          type: "OccupationalHealthcare",
          specialist: specialist,
          description: description,
          employerName: employerName,
          ...(diagnosisCodes.length > 0 && { diagnosisCodes: diagnosisCodes }),
          ...(startDate && endDate && { sickLeave: { 
            startDate: startDate.format('YYYY-MM-DD'), 
            endDate: endDate.format('YYYY-MM-DD') 
          }}),
        };
      
        try {
          await patientservice.createEntry(id, occupationalEntry);
        } catch (error) {
          console.error('Error creating entry:', error);
          if (error.response.data) {
            setErrorMessage(error.response.data);
            setTimeout(() => {
              setErrorMessage('');
            }, 3000);
          }
        }
      }
    };
  
    const handleAddCode = () => {
      setDiagnosisCodes(diagnosisCodes.concat(diagnosisCode));
      setDiagnosisCode('');
    };
    
    return (
      <div>
        <form style={{ display: "flex", flexDirection: "column", gap: "10px"}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(newDate) => setDate(newDate)}
            />
          </LocalizationProvider>
          <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <TextField
            label="Specialist"
            fullWidth 
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <div style={{display: 'flex', gap:"10px"}}>
            <TextField
              label="DiagnosisCode"
              fullWidth 
              value={diagnosisCode}
              onChange={({ target }) => setDiagnosisCode(target.value)}
            />
            <Button onClick={handleAddCode} variant="contained">Add DiagnosisCode</Button>
          </div>
          <div>
            {diagnosisCodes.length > 0 && (
              <h4>DiagnosisCodes</h4>
            )}
            <List>
              {diagnosisCodes.map((code) => (
                <ListItem key={code}>
                  <ListItemText primary={code} />
                </ListItem>
              ))}
            </List>
          </div>
          <TextField
            label="Employer"
            fullWidth 
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
          />
          <h4>Sickleave</h4>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start date"
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End date"
            value={endDate}
            onChange={(newDate) => setEndDate(newDate)}
          />
        </LocalizationProvider>
          <Button size="medium" onClick={handleSubmit} variant="contained">Create</Button>
        </form>
        {errorMessage !== "" && (
          <Alert severity="error">{errorMessage}</Alert>
        )}
      </div>
      );
  };

export default CreateEntry;