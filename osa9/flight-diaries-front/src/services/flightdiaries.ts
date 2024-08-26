import axios from "axios";

import { Diary, NewDiary } from "../types";

const getDiaries = async () => {
  return await axios
    .get<Diary[]>('http://localhost:3000/api/diaries')
    .then(response => response.data)
}

const createDiary = async (diary: NewDiary) => {
  return await axios
    .post<Diary>('http://localhost:3000/api/diaries', diary)
    .then(response => response.data)
}

export { getDiaries, createDiary };