import styles from './styles.module.css'
import { CollectionPageTitleProps } from './types'

const CollectionPageTitle = ({ title, description = '' }: CollectionPageTitleProps) => {
  return (
    <div>
      <h1 className={styles.collectionTitle}>{title}</h1>
      {description && <div>{description}</div>}
    </div>
  )
}

export default CollectionPageTitle
