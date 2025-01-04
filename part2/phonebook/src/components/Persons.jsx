const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <ul>
      {personsToShow.map(person => 
        <li key={person.id}>
          <span>{person.name}</span>
          <button onClick={() => deletePerson(person.id)}>Delete</button>
          <p>{person.number}</p>
          
        </li>
      )}
    </ul>
  )}

export default Persons