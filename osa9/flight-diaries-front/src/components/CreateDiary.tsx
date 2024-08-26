import { useState } from "react";
import { AxiosError } from "axios";

import { createDiary } from "../services/flightdiaries";
import { NewDiary, Diary } from "../types";

interface CreateDiaryProps {
  addDiary: (newDiary: Diary) => void;
}

const CreateDiary = ( {addDiary}: CreateDiaryProps ) => {
  const [date, setDate] = useState<string>('');
  const [visibility, setVisibility] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary: NewDiary = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    }
    try {
      const diaryEntry = await createDiary(newDiary);
      addDiary(diaryEntry);
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        console.log(e.response.data);
        setErrorMessage(e.response.data ?? 'Unknown error');
      } else {
        console.error(e);
        setErrorMessage('An unexpected error occurred');
      }
      setTimeout(() => {
        setErrorMessage('');
      }, 5000)
    }
  }

  const handleVisibilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(e.target.value);
  };

  const handleWeatherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(e.target.value);
  };

  return (
    <>
    <h1>Add entry</h1>
    {errorMessage !== '' && (
      <p style={{ color: 'red' }}>{errorMessage}</p>
    )}
    <form onSubmit={handleSubmit}>
      <div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
      </div>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <label>Visibility</label>
          <div>
            <label>
              <input
                type="radio"
                value="great"
                checked={visibility === 'great'}
                onChange={handleVisibilityChange}
              />
              Great
            </label>
            <label>
              <input
                type="radio"
                value="good"
                checked={visibility === 'good'}
                onChange={handleVisibilityChange}
              />
              Good
            </label>
            <label>
              <input
                type="radio"
                value="ok"
                checked={visibility === 'ok'}
                onChange={handleVisibilityChange}
              />
              Ok
            </label>
            <label>
              <input
                type="radio"
                value="poor"
                checked={visibility === 'poor'}
                onChange={handleVisibilityChange}
              />
              Poor
            </label>
          </div>
        </div> 
        <div style={{ display: 'flex', flexDirection: 'row'}}>
          <label>Weather</label>
          <div>
            <label>
              <input
                type="radio"
                value="sunny"
                checked={weather === 'sunny'}
                onChange={handleWeatherChange}
              />
              Sunny
            </label>
            <label>
              <input
                type="radio"
                value="rainy"
                checked={weather === 'rainy'}
                onChange={handleWeatherChange}
              />
              Rainy
            </label>
            <label>
              <input
                type="radio"
                value="cloudy"
                checked={weather === 'cloudy'}
                onChange={handleWeatherChange}
              />
              Cloudy
            </label>
            <label>
              <input
                type="radio"
                value="stormy"
                checked={weather === 'stormy'}
                onChange={handleWeatherChange}
              />
              Stormy
            </label>
            <label>
              <input
                type="radio"
                value="windy"
                checked={weather === 'windy'}
                onChange={handleWeatherChange}
              />
              Windy
            </label>
          </div>
        </div>
      <div>
        <label>comment</label>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}/>
      </div>
      <button>add</button>
    </form> 
    </>
  )
}

export default CreateDiary;