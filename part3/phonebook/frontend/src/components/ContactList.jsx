import styles from '../styles/ContactList.module.css';

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <ul className={styles.contactList}>
      {personsToShow.map(person => (
        <li key={person.id} className={styles.contactItem}>
          <span className={styles.contactName}>{person.name}</span>
          <span className={styles.contactNumber}>{person.number}</span>
          <button className={styles.deleteButton} onClick={() => deletePerson(person.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Persons