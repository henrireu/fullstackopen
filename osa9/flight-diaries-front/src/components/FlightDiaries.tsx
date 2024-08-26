import { Diary } from "../types";

interface FlightDiariesProps {
  diaries: Diary[];
}

interface FlightDiaryProps {
  diary: Diary;
}

const FlightDiaries = ({ diaries }: FlightDiariesProps) => {

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
      <h1>Diary entries</h1>
      {diaries.map(diary => (
        <FlightDiary key={diary.id} diary={diary} />
      ))}
    </div>
  )
}

const FlightDiary = ( {diary}: FlightDiaryProps ) => {
  return (
    <div>
      <p>date: {diary.date}</p>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  )
}

export default FlightDiaries;