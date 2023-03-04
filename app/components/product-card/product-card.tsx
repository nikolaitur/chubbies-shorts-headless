import { Image } from '@shopify/hydrogen'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import { HeartIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import SwatchSelector from '@solo-brands/ui-library.ui.atomic.swatch-selector'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import { ProductCardFragment } from '~/graphql/generated'
import styles from './styles.module.css'

const ProductCard = ({ product }: { product: ProductCardFragment | null }) => {
  const { title, featuredImage, display_name, variants } = product || {}
  const productTitle = display_name?.value || title
  const sizeVariants =
    variants?.nodes?.map(
      variant => variant?.selectedOptions?.find(option => option?.name === 'Size')?.value,
    ) || []
  const selectedSize = 'XS'
  const colorVariants = ['#3B53AA', '#D9D9D9', '#1F2846']
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image className={styles.image} data={featuredImage || {}} />
        <div className={styles.tag}>SALE</div>
        <ButtonIcon
          className={styles.favorite}
          variant="tertiary"
          border="rounded"
          icon={<HeartIcon fill="#000000" />}
        />
      </div>
      <Button className={styles.actions} variant="tertiary">
        Quick Shop
      </Button>
      <div className={styles.productDescription}>
        <h1 className={styles.title}>{productTitle}</h1>
        <Price amount="199.0" />
        <div className={styles.title}>Ultimate Training Short</div>
      </div>
      <div className={styles.colorVariants}>
        {colorVariants.map(variant => {
          return <SwatchSelector key={variant} colors={[variant]} option={variant} />
        })}
      </div>
      <div className={styles.sizeVariants}>
        {sizeVariants.map(variant => {
          /* @ts-expect-error gotta fix dis */
          return <VariantSelector selected={false} key={variant} size="md" option={variant} />
        })}
      </div>
      <div className={styles.cardFooter}>
        <span>Footer text here</span>
      </div>
    </div>
  )
}

export default ProductCard
