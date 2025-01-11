import { useState , useEffect} from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import bookService from './services/book'
import Notification from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
	 bookService
		.getAll()
		.then(initialPersons => {
		  setPersons(initialPersons)
		})
  },[])

  const addPerson = (event) => {
	  event.preventDefault();

	const personExists = persons.find(person => person.name === newName);
	const personWithDifferentPhone = personExists && personExists.number !== newPhone;

	if (personExists && !personWithDifferentPhone) {
		alert(`${newName} is already added to phonebook`);
		return;
	}

	if (personWithDifferentPhone) {
		if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
			const updatedPerson = { ...personExists, number: newPhone };

			console.log(updatedPerson);
			
			bookService
			.update(updatedPerson.id, updatedPerson)
			.then(returnedPerson => {
				setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson));
				setNewName('');
				setNewPhone('');
				setErrorMessage(`Updated ${newName}'s phone number`);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			})
			.catch(error => {
				setErrorMessage(`Failed to update ${newName}: ${error.response.data.error}`);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
		}
		return;
  }

  const personObject = {
	 name: newName,
	 number: newPhone,
	 id: persons.length + 1, // Asegúrate de que la ID sea única o usa el id generado en el backend.
  };

  bookService
	 .create(personObject)
	 .then(returnedPerson => {
		setPersons(persons.concat(returnedPerson));
		setNewName('');
		setNewPhone('');
		setErrorMessage(`Added ${newName}`);
		setTimeout(() => {
		  setErrorMessage(null);
		}, 5000);
	 })
	 .catch(error => {
		setErrorMessage(`Failed to add ${newName}: ${error.response.data.error}`);
		setTimeout(() => {
		  setErrorMessage(null);
		}, 5000);
	 });
};

  const deletePerson = (id) => {
	 console.log(id);
	 
	 const person = persons.find(person => person.id === id)
	 if(window.confirm(`Delete ${person.name}?`)){
		bookService
		  .deletePerson(id)
		  .then(() => {
			  setPersons( persons.filter( person => person.id !== id ) )
			  setErrorMessage(`Deleted ${newName}`);
		  } ).catch( error => {
			  setErrorMessage(`Failed to delete ${newName}: ${error.response.data.error}`);
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