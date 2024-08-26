import express from 'express';
import cors from 'cors';
import diagnosyRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here src');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosyRouter);

app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});