import { useState, useEffect } from "react";
import { getDiaries } from "./services/flightdiaries";

import { Diary } from "./types";
import FlightDiaries from "./components/FlightDiaries";
import CreateDiary from "./components/CreateDiary";

const App = () => {
  const [flightDiaries, setFlightDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const data = await getDiaries();
        setFlightDiaries(data);
      } catch (error) {
        console.error("Error fetching diaries:", error);
      }
    };

    fetchDiaries();
  }, []);

  const addDiary = (newDiary: Diary) => {
    setFlightDiaries(flightDiaries.concat(newDiary))
  }

  return (
    <div>
      <CreateDiary addDiary={addDiary}/>
      <FlightDiaries diaries={flightDiaries}/>
    </div>
  )
}

export default App
