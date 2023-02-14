import styles from './styles.module.css'
import { CollectionPageTitleProps } from './types'

const CollectionPageTitle = ({ title }: CollectionPageTitleProps) => {
  return <h1 className={styles.collectionTitle}>{title}</h1>
}

export default CollectionPageTitle
