import styles from './styles.module.css'

const NavIndicator = ({ count = 0 }: { count: number }) => {
  return count ? <div className={styles.indicator}>{count}</div> : null
}

export default NavIndicator
