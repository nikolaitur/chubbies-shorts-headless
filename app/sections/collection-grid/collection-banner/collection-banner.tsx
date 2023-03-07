import { Image } from '@shopify/hydrogen'
import styles from './styles.module.css'
import clsx from 'clsx'
import { CollectionBannerProps } from './types'

const CollectionBanner = ({ className, image }: CollectionBannerProps) => {
  return (
    <div className={clsx(styles.collectionBanner, className)}>
      <Image className={styles.image} data={{ altText: image?.alt, url: image?.src }} />
    </div>
  )
}

export default CollectionBanner
