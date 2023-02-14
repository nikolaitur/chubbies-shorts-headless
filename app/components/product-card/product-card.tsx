import { Image } from '@shopify/hydrogen'
import styles from './styles.module.css'
import { ProductCardProps } from './types'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import { HeartIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import SwatchSelector from '@solo-brands/ui-library.ui.atomic.swatch-selector'

const ProductCard = () => {
  const backgroundImage = {
    alt: 'test',
    src: 'https://via.placeholder.com/150 ',
  }
  const sizeVariants = ['XS', 'S', 'M']
  const selectedSize = 'XS'
  const colorVariants = ['#3B53AA', '#D9D9D9', '#1F2846']
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          data={{ altText: backgroundImage?.alt, url: backgroundImage?.src }}
        />
        <div className={styles.tag}>SALE</div>
        <ButtonIcon
          className={styles.favorite}
          variant="tertiary"
          border="rounded"
          icon={<HeartIcon fill="#000000" />}
        ></ButtonIcon>
      </div>
      <Button className={styles.actions} variant="tertiary">
        Quick Shop
      </Button>
      <div className={styles.productDescription}>
        <h1 className={styles.title}>Ultimate Training Short</h1>
        <Price amount="199.0" />
        <div className={styles.title}>Ultimate Training Short</div>
      </div>
      <div className={styles.colorVariants}>
        {colorVariants.map(variant => {
          return (
            <SwatchSelector key={variant} variant="one-color" colors={[variant]} option={variant} />
          )
        })}
      </div>
      <div className={styles.sizeVariants}>
        {sizeVariants.map(variant => {
          return (
            <VariantSelector
              selected={selectedSize === variant}
              key={variant}
              size="md"
              option={variant}
            />
          )
        })}
      </div>
      <div className={styles.cardFooter}>
        <span>Footer text here</span>
      </div>
    </div>
  )
}

export default ProductCard
