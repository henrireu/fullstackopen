import { useState, useEffect } from 'react'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtername, setFiltername] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.log('fail')
      })
  }, [])

  const showErrorMessage = (name) => {
    setErrorMessage(
      `${name} has already removed from server`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const showMessage = (whatMessage, name) => {
    if (whatMessage === 'delete') {
      setMessage(
        `${name} deleted`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addName = (event) => {
    event.preventDefault()
    console.log(filtername)
    let lista = persons.map(person => person.name)
    if (!lista.includes(newName)) {

      const newPerson = {
        name: newName,
        number: newNumber
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setMessage(
            `Added ${newPerson.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log('fail')
          setErrorMessage(newPerson.name)
        })

      //
    } else {
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmed) {
        let id;
        persons.map(person => {
          if (person.name === newName) {
            id = person.id;
          }
        })

        const newObject = {
          id: id,
          name: newName,
          number: newNumber
        }
        personService
          .update(id, newObject)
          .then(returnedPerson => {
            //tee ensin tietokanta sitten state
            let newPersons = persons.map((person) => person.id === id ? newObject : person)
            setMessage(
              `Added ${newObject.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(newPersons)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log("fail")
            showErrorMessage(newObject.name)
          })
      }
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFiltername = (event) => {
    setFiltername(event.target.value)
  }

  const deletePerson = (id) => {
    setPersons(persons.filter(person => person.id !== id))
  }

  return (
    <div>

      <h2>Phonebook</h2>

      <Notification message={message} />
      <ErrorNotification message={errorMessage} />

      <Filter filtername={filtername} handleFiltername={handleFiltername}/>

      <h2>add a new</h2>

      <PersonForm 
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Numbers numbers={persons} filter={filtername} deletePerson2={deletePerson} showMessage={showMessage}/>
      
    </div>
  )

}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="errormessage">
      {message}
    </div>
  )
 }

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
 }

const PersonForm = ({ addName, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input
                value={newName}
                onChange={handleNameChange}
              />
      </div>
      <div>
        number: <input 
                  value={newNumber}
                  onChange={handleNumberChange}
                />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ filtername, handleFiltername}) => {
  return (
    <>
      filter shown with <input 
        value={filtername}
        onChange={handleFiltername}
      />
    </>
  )
}

const Numbers = ({numbers, filter, deletePerson2, showMessage}) => {

  const deletePerson = (id, name) => {
    const confirmed = window.confirm("are you sure to delete person?")
    if (confirmed) {
      showMessage('delete', name)
      personService
        .deletee(id)
      deletePerson2(id)  
    }  
  }

  let filteredNumbers = numbers.filter(number => number.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <ul> 
      {filteredNumbers.map(number => (
        <li key={number.name}>
          {number.name} {number.number} 
          <button onClick={() => deletePerson(number.id, number.name)}>delete</button> 
        </li>
      ))}
    </ul>
  )
}

export default App
