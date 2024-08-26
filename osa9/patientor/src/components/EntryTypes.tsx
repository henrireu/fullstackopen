import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../types";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealingIcon from '@mui/icons-material/Healing';

interface EntryProps {
  entry: Entry;
}

function assertNever(value: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(value)}`);
}

const EntryTypes = ({ entry }: EntryProps) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry as HospitalEntry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry as OccupationalHealthcareEntry}/>;
    case "HealthCheck":
      return <HealthCheck entry={entry as HealthCheckEntry}/>;
    default:
      return assertNever(entry);
  } 
};

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry}) => {
  return (
    <div>
      <HealingIcon />
      <p>employer: {entry.employerName}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

const Hospital = ({ entry }: {entry: HospitalEntry}) => {
  return (
    <div>
      <LocalHospitalIcon />
      <p>diagnose by {entry.specialist}</p>
      <p>discharge: {entry.discharge.date} {entry.discharge.criteria}</p>
    </div>
  );
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry}) => {
  const rating = entry.healthCheckRating;
  
  const getColorForRating = (rating: number): string => {
    switch (rating) {
      case 0:
        return 'green'; 
      case 1:
        return 'yellow'; 
      case 2:
        return 'blue'; 
      case 3:
        return 'orange'; 
      case 4:
        return 'red'; 
      default:
        return 'gray'; 
    }
  };

  const heartColor = getColorForRating(rating);

  return (
    <div>
      <MonitorHeartIcon />
      <p>diagnose by {entry.specialist}</p>
      <FavoriteIcon style={{ color: `${heartColor}`}}/>
    </div>
  );
};

export default EntryTypes;