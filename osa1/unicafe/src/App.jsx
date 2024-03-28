import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button handleClick={() => setGood(good + 1)} name="good"/>
        <Button handleClick={() => setNeutral(neutral + 1)} name="neutral"/>
        <Button handleClick={() => setBad(bad + 1)} name="bad"/>
      </div>
      <h1>statistics</h1>

      <Statistics objekti={{good: good, neutral: neutral, bad: bad}} />
      
    </div>
  )
}



const Button = ({handleClick, name}) => <button onClick={handleClick}>{name}</button>

const Statistics = ({objekti}) => {
  const good = objekti.good;
  const neutral = objekti.neutral;
  const bad = objekti.bad;

  const keskiarvo = () => {
    const yhteensa = good + neutral + bad;
    const summa = good * 1 + bad * -1;
    return summa / yhteensa;
  }    

  const positiivisia = () => {
    const yhteensa = good + neutral + bad;

    return good / yhteensa * 100;
  }

  if (good + neutral + bad < 1) {
    return (
      <div>
        <p>no feedback given</p>
      </div>
    )
  }
  
  return (
    <table>
      <tbody>
        <tr><StatisticLine text="good" value={good}/></tr>
        <tr><StatisticLine text="neutral" value={neutral}/></tr> 
        <tr><StatisticLine text="bad" value={bad}/></tr> 
        <tr><StatisticLine text="all" value={good + bad + neutral}/></tr> 
        <tr><StatisticLine text="average" value={keskiarvo()}/></tr> 
        <tr><StatisticLine text="positive" value={positiivisia()}/></tr> 
      </tbody>
    </table>
  )
} 

const StatisticLine = ({value, text}) => {
  if (text === "positive") {
    return <td>{text} {value}%</td>
  } else {
    return <td>{text} {value}</td>
  }
} 

export default App
