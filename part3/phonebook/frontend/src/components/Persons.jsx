import styles from '../styles/Persons.module.css'

const Persons = ({ personsToShow, deletePerson }) => {
	
  return (
    <ul className={styles.numbers}>
      {personsToShow.map(person => 
        <li key={person.id} className={styles.contact}>
          <span>{person.name}</span>
          <p>{person.number}</p>
          <button onClick={() => deletePerson(person.id)}>Delete</button>
          
        </li>
      )}
    </ul>
  )}

export default Persons