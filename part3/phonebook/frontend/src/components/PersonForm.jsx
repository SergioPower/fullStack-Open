import styles from  '../styles/PersonForm.module.css'

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson} className={styles.form}>
      <div>
        name: <input 
        value={newName} 
        onChange={handleNameChange}
				required
        />
      </div>
      <div>
        number: <input 
        value={newNumber} 
        onChange={handleNumberChange}
				placeholder='Enter 10 digits'
				required
				/>
			</div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm