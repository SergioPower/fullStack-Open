import styles from '../styles/Filter.module.css'

const Filter = ({ value, onChange }) => {
  return (
    <div className={styles.filterContainer}>
			<label htmlFor="filter">filter shown with: </label>
      <input value={value} onChange={onChange} className={styles.filterInput}/>
    </div>
  )
}

export default Filter