import styles from './styles.module.css'
import { HTMLAttributes } from 'react'

const Header = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={styles.container}>{children}</div>
}

export default Header
