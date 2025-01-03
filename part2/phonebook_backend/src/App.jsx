import { useState , useEffect} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import noteService from './services/notes'
import Notification from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName) && persons.find(person => person.number === newPhone)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (persons.find(person => person.name === newName) && persons.find(person => person.number !== newPhone)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
      return
      
    }
    const personObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1
    }
    noteService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewPhone('')
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (id) => {
    console.log(id);
    
    const person = persons.find(person => person.id === id)
    if(window.confirm(`Delete ${person.name}?`)){
      noteService
        .deletePerson(id)
        .then(returnedPersonDelete => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handlePersonChange}
        newNumber={newPhone}
        handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App