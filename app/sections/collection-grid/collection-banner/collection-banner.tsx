import { Image } from '@shopify/hydrogen'
import styles from './styles.module.css'
import clsx from 'clsx'
import { CollectionBannerProps } from './types'

const CollectionBanner = ({ className }: CollectionBannerProps) => {
  // TODO: Remove on Logic
  const backgroundImage = {
    alt: 'test',
    src: 'https://via.placeholder.com/160 ',
  }
  return (
    <div className={clsx(styles.collectionBanner, className)}>
      <Image
        className={styles.image}
        data={{ altText: backgroundImage?.alt, url: backgroundImage?.src }}
      />
    </div>
  )
}

export default CollectionBanner
