import express from 'express';

import { calculate } from './bmiCalculator';
import { exerciseCalculating } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height?.toString();
  const weight = req.query.weight?.toString();

  if (!height || !weight) {
    res.send('give height and weight');
  } else {
    console.log(height, weight);
    const result = calculate(height, weight);

    if ( result === "error") {
      res.send({ error: "malformatted parameters" });
    } else {
      const object = {
        weight: weight,
        height: height,
        bmi: result
      };
  
      res.send(object);
    }
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.send({ error: "parameters missing" });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = exerciseCalculating(daily_exercises, target);
  return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});