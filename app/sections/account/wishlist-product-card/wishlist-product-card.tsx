import { Image } from '@shopify/hydrogen'
import ButtonAddToCart from '@solo-brands/ui-library.ui.atomic.button-add-to-cart'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import { HeartIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import { ClientOnly } from 'remix-utils'
import styles from './styles.module.css'

const WishlistProductCard = () => {
  const backgroundImage = {
    alt: 'test',
    width: '343',
    height: '514',
    src: 'https://cdn.shopify.com/s/files/1/0077/0432/products/SECRET_AGENTS_7_ULTIMATE_TRAINING_SHORT__SD_337212-03_7792_200x.webp?v=1667596300 ',
  }
  return (
    <ClientOnly>
      {() => (
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.image}
              data={{ altText: backgroundImage?.alt, url: backgroundImage?.src }}
              width={backgroundImage?.width}
              height={backgroundImage?.height}
            />
            <ButtonIcon
              className={styles.favorite}
              variant="tertiary"
              border="rounded"
              icon={<HeartIcon />}
            />
          </div>
          <div className={styles.productDescription}>
            <h2 className={styles.title}>Ultimate Training Short</h2>
            <Price amount="199.0" />
            <div className={styles.subTitle}>The Snack Attacks - 5.5</div>
          </div>
          <div className={styles.addToCart}>
            <ButtonAddToCart size="lg" />
          </div>
          <div className={styles.cardFooter}>
            <span>GOOD THIGHDINDS SALE: 30% OFF WITH CODE &#34;THIGHDINGS30&#34;</span>
          </div>
        </div>
      )}
    </ClientOnly>
  )
}

export default WishlistProductCard
