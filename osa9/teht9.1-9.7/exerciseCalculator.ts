import { countRating } from "./utils";
import { pickProcessEnvNumbers } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (lista: number[], target: number): Result => {
  const periodLength = lista.length;
  const trainingDays = lista.filter((a: number) => a !== 0);
  let hoursSum = 0;
  lista.forEach(a => { hoursSum += a;});
  const average = hoursSum / periodLength;

  const success = target <= average ? true : false;

  const { rating, ratingDescription } = countRating(average, target);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays.length,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription, 
    target: target,
    average: average,
  };
};

export const exerciseCalculating = (lista: number[], target: number) => {
  if (lista.length < 1) {
    return { error: "parameters missing"};
  }
  if (!lista.every(a => typeof a === 'number' && !isNaN(a))) {
    return { error: "malformatted parameters"};
  }
  if (isNaN(target)) {
    return { error: "malformatted parameters"};
  }

  return calculateExercises(lista, target);
};

const target: number = Number(process.argv[2]);
const hourList = pickProcessEnvNumbers(process.argv);

console.log(calculateExercises(hourList, target));


