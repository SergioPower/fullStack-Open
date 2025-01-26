import styles from '../styles/Notifications.module.css'

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={`error ${styles.notificationContainer}`}>

      <p className={styles.notificationMessage}>{message}</p>
    </div>
  )
}

export default Notification