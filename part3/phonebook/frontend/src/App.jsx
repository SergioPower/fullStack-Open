import { useState , useEffect} from 'react'
import Persons from './components/ContactList'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import bookService from './services/book'
import Notification from './components/Error'
import styles from './styles/App.module.css'

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

	const normalizeName = (newName) => {
    // Convierte el nombre a minúsculas y luego capitaliza la primera letra
    return newName.charAt(0).toUpperCase() + newName.slice(1).toLowerCase();
  };
	
  const addPerson = (event) => {
	  event.preventDefault();

		const cleanedNewName = normalizeName(newName);
		
		const cleanedPhoneNumber = newPhone.replace(/\D/g, '');

		if (cleanedPhoneNumber.length !== 10) {
			setErrorMessage('Phone number must be 10 digits long'); 
			return;
		}

		// Check if the phone numer exists in the phonebook
		const personExists = persons.find(person => person.name === cleanedNewName);
		const personWithDifferentPhone = personExists && personExists.number !== cleanedPhoneNumber;

		// If the person exists, ask the user if they want to update the phone number
		if (personExists && !personWithDifferentPhone) {
			alert(`${cleanedNewName} is already added to phonebook`);
			return;
		}

		// If the person exists, ask the user if they want to update the phone number
		if (personWithDifferentPhone) {
			if (window.confirm(`${cleanedNewName} is already added to phonebook, replace the old number with a new one?`)) {
				const updatedPerson = { ...personExists, number: cleanedPhoneNumber };

				bookService
				.update(updatedPerson.id, updatedPerson)
				.then(returnedPerson => {
					setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson));
					setNewName('');
					setNewPhone('');
					setErrorMessage(`Updated ${cleanedNewName}'s phone number`);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
				})
				.catch(error => {
					setErrorMessage(`Failed to update ${cleanedNewName}: ${error.response.data.error}`);
					setTimeout(() => {
						setErrorMessage(null);
					}, 5000);
				});
			}
			return;
		}

		const personObject = {
		name: cleanedNewName,
		number: cleanedPhoneNumber,
		id: persons.length + 1, // Asegúrate de que la ID sea única o usa el id generado en el backend.
		};

		bookService
		.create(personObject)
		.then(returnedPerson => {
			setPersons(persons.concat(returnedPerson));
			setNewName('');
			setNewPhone('');
			setErrorMessage(`Added ${cleanedNewName}`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		})
		.catch(error => {
			setErrorMessage(`Failed to add ${cleanedNewName}: ${error.response.data.error}`);
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		});
	};

  const deletePerson = (id) => {
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
	  <div className={styles.phonebook}>
		  <h1>Phonebook</h1>
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