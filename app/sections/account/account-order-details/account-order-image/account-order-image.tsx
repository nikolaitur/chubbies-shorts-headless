import { Image } from '@shopify/hydrogen'
import styles from './styles.module.css'
import { OrderImageProps } from './types'

const OrderImage = ({ image }: OrderImageProps) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.counter}>1</span>
      <Image
        data={{ altText: image?.alt, url: image?.src }}
        className={styles.media}
        width={image?.width}
        height={image?.height}
      />
    </div>
  )
}

export default OrderImage
