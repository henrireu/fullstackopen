export const countRating = (average: number, target: number) => {
  const num = (average - target) * 100;
  let rating = 0;
  let ratingDescription = '';

  if (num < -30) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (num < 30) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'pretty good';
  }

  const object = {
    rating: rating,
    ratingDescription: ratingDescription
  };

  return object;
};

export const pickProcessEnvNumbers = (lista: string[]): number[] => {
  //if (lista.length < 4) throw new Error('Not enougn arguments');

  const filteredList = lista.filter((_a, index) => index > 2);

  const numberList: number[] = [];
  for (let x = 0; x < filteredList.length; x++) {
    if (!isNaN(Number(filteredList[x]))) {
      numberList.push(Number(filteredList[x]));
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  //const numberList = filteredList.map(s => Number(s));
  return numberList;
};