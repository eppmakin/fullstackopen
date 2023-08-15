import { useState, useEffect } from 'react' 
import personService from './services/persons.js'
import './index.css'

const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }
  const notificationClass = messageType === 'success' ? 'success-notification' : 'error-notification';
  return (
    <div className={notificationClass}>
      {message}
    </div>
  )
}

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      filter shown with <input value={searchTerm} onChange={handleSearch} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ personsToShow, setPersons, setNotification, setNotificationType }) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(personsToShow.filter(person => person.id !== id))
          setNotification(`Deleted ${name}`)
          setNotificationType('success')
          setTimeout(() => {
            setNotification(null);
          }, 8000)
        })
      .catch(error => {
          console.error('Error deleting person:', error)
          setNotification('Error deleting person')
          setNotificationType('error')
          setTimeout(() => {
            setNotification(null);
          }, 8000)
      })
      }
    }
    return (
      <ul>
        {personsToShow.map(person => (
          <li key={person.id}>
            {person.name} {person.number}{' '}
            <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
          </li>
        ))}
      </ul>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response)
      })
      .catch(error => {
        console.error('Error fetching initial data: ', error)
      })
   }, 
  [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const found = persons.find(p => p.name === newName)
    if (found) {
      alert(`${newName} is already added to phonebook`)
      setNotification('Error adding person');
      setNotificationType('error');
      setTimeout(() => {
        setNotification(null);
      }, 8000)
      return
    }

    personService.createWithError(personObject)
      .then((response) =>{
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${response.name}`);
        setNotificationType('success');
        setTimeout(() => {
          setNotification(null);
        }, 8000)
      })
      .catch((error) => {
        console.error("Error in adding the person:", error)
        setNotification('Error adding person');
        setNotificationType('error');
        setTimeout(() => {
          setNotification(null);
        }, 8000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const personsToShow = searchTerm === ''
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} messageType={notificationType} />
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons 
        personsToShow={personsToShow} 
        setPersons={setPersons} 
        setNotification={setNotification}
        setNotificationType={setNotificationType}
      />
    </div>
  )
}

export default App

