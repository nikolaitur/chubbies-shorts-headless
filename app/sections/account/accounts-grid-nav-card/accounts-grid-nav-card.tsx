import { Image } from '@shopify/hydrogen'
import styles from './styles.module.css'
import { GridNavCardProps } from './types'

const GridNavCard = ({ image }: GridNavCardProps) => {
  return (
    <div className={styles.wrapper}>
      <Image
        data={{
          altText: image?.altText,
          url: image?.url,
          width: image?.width,
          height: image?.height,
        }}
        className={styles.media}
      />
      <span className={styles.title}>{image?.altText}</span>
    </div>
  )
}

export default GridNavCard
