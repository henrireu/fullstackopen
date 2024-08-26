/*interface BMIvalues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): BMIvalues => {
  if (args.length < 4) throw new Error('Not enougn arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
        value1: Number(args[2]),
        value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}*/

const calculateBmi = (a: number, b: number): string => {
  const m = a / 100;
  const bmi = b / (m * m);
  if (bmi >= 25) {
    return 'Overweight';
  } else if (bmi <= 18.4) {
    return 'Underweight';
  } else {
    return 'Normal range';
  }
};

export const calculate = (v1: string, v2: string): string => {
  if (!isNaN(Number(v1)) && !isNaN(Number(v2))) {
    const result = calculateBmi(Number(v1), Number(v2));
    return result;
  } else {
    return 'error';
  } 
};

/*const { value1, value2 } = parseArguments(process.argv);
console.log(calculateBmi(value1, value2));*/
