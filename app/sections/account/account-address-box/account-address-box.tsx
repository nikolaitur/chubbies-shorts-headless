import { Link } from '@remix-run/react'
import styles from './styles.module.css'

const AddressBox = () => (
  <div className={styles.wrapper}>
    <div className={styles.addressInfo}>
      <span className={styles.name}>Ricardo Test (Default)</span>
      <span className={styles.address}>
        Address Line <br />
        Country
      </span>
    </div>
    <Link to={''} className={styles.editButton}>
      Edit
    </Link>
  </div>
)

export default AddressBox
