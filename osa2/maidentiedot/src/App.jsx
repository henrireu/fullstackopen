import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countrySearch, setCountrySearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })

  },[])


  const handleSearch = (event) => {
    setCountrySearch(event.target.value)
  }


  return (
   <div>
      find countries <input
        value={countrySearch}
        onChange={handleSearch}
      />
      <SuggestedCountries countries={countries} search={countrySearch}/>
   </div>
  )
}

const SuggestedCountries = ({ countries, search }) => {
  const [showCountry, setShowCountry] = useState([false, 0])


  //tämä sen takia että ei mene sekasin listaus kun kirjoitetaan ja näytetään yhtä maata
  useEffect(() => {
    setShowCountry([false, 0])
  },[search])

  let suggestions = []
  countries.map(country => {
    if(country.name.common.toLowerCase().startsWith(search.toLowerCase())) {
      suggestions.push(country)
    }
  })

  const show = (index) => {
    setShowCountry([!showCountry[0], index])
  }

  if (showCountry[0] === true) {
    const a = suggestions[showCountry[1]]
    let languages = Object.values(a.languages)
    return (
      <div>
        <h1>{a.name.common}</h1>
        <p>capital {a.capital[0]}</p>
        <p>area {a.area}</p>
        <h3>languages</h3>
        {languages.map((l, index) => (
          <p key={index}>{l}</p>
        ))}
        <img src={a.flags.png} />
        <Weather capital={a.capital[0]}/>
      </div>
    )
  }

  if (suggestions.length < 11 && suggestions.length > 1) {
    return (
      <>
        {suggestions.map((suggestion, index) => (
          <div key={suggestion.name.common} className="same">
            <p>{suggestion.name.common}</p>
            <button onClick={() => show(index)}>show</button>
          </div>
        ))}
      </>
      
    )
  }

  if (suggestions.length === 1) {
    const a = suggestions[0]
    let languages = Object.values(a.languages)
    return (
      <div>
        <h1>{a.name.common}</h1>
        <p>capital {a.capital[0]}</p>
        <p>area {a.area}</p>
        <h3>languages</h3>
        {languages.map((l, index) => (
          <p key={index}>{l}</p>
        ))}
        <img src={a.flags.png} />
        <Weather capital={a.capital[0]}/>
      </div>
    )
  }

  return <p>Too many matches, specify another filter</p>
  
}

const Weather = ( {capital} ) => {
  const [data, setData] = useState(null)
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${capital}?include=fcst%2Cobs%2Chistfcst%2Cstats%2Cdays%2Chours%2Ccurrent%2Calerts&key=3JU9HZE5P76HNDY64XYEP77P8&options=beta&contentType=json`
  useEffect(() => {
    axios.get(url)
      .then(response => {
        setData(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log("fail")
      })

  },[])

  if(data) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {(data.currentConditions.temp - 30) / 2} Celsius</p>
        <h3>tästä sää API:sta ei tullut sääIkonia</h3>
        <p>wind {data.currentConditions.windspeed} m/s</p>
      </div>
    )
  }

  return (
    <p>loading...</p>
  )

  
}

export default App
