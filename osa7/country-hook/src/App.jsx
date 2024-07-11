import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

  useEffect(() => {
    axios.get(`${baseUrl}name/${name}`)
    .then(response => {
      setCountry(response)
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
      setCountry(null)
    })
  }, [name])

  console.log(country)

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return (
      <div>
        not found..
      </div>
    )
  }

  if (country) {
    console.log("country ", country)
    return (
      <div>
        <h3>{country.data.name.common} </h3>
        <div>capital {country.data.capital} </div>
        <div>population {country.data.population}</div> 
        <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`}/> 
      </div>
    )
  }
  

  /*return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )*/
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    console.log(nameInput.value)
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App