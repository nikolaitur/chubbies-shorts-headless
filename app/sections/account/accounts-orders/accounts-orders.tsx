import { Link } from '@remix-run/react'
import styles from './styles.module.css'

const orderHeadings = ['Order', 'Date', 'Status', 'Total']

const AccountsOrder = () => (
  <div className={styles.tableContainer}>
    <table className={styles.table}>
      <thead>
        <tr className={styles.tableHeadingRow}>
          {orderHeadings.map((heading, index) => (
            <th key={`heading-${index}`}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className={styles.tableDataRow}>
          <td className={styles.orderNumber}>#4004004</td>
          <td>Dec 08,2022</td>
          <td>Fulfilled</td>
          <td>USD$55,00</td>
        </tr>
        <tr className={styles.tableDataRow}>
          <td className={styles.orderNumber}>#4004004</td>
          <td>Dec 08,2022</td>
          <td>Fulfilled</td>
          <td>USD$55,00</td>
        </tr>
      </tbody>
    </table>
    <Link to={''} className={styles.link}>
      Returns & Exchanges
    </Link>
  </div>
)

export default AccountsOrder
