interface Diary {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

interface NewDiary {
  date: string;
  weather: string;
  visibility: string;
  comment?: string;
}

export type { Diary, NewDiary };