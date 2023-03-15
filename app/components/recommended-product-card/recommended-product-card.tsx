import { Image } from '@shopify/hydrogen'
import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon/dist/button-icon'
import MessageCard from '@solo-brands/ui-library.ui.atomic.message-card'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import ProductTag from '@solo-brands/ui-library.ui.atomic.product-tag'
import ProductTitle from '@solo-brands/ui-library.ui.atomic.product-title'
import clsx from 'clsx'
import { useRef } from 'react'
import ProductContext, {
  useProductActions,
  useProductState,
} from '~/global-context/product-context'
import { getDisplayPrices } from '~/helpers'
import Link from '../link'
import VariantOverlay from '../variant-overlay'
import WishlistButton from '../wishlist-button'
import styles from './styles.module.css'
import { RecommendedProductCardProps } from './types'

const RecommendedProductCardInner = ({
  size = 'md',
}: Omit<RecommendedProductCardProps, 'product'>) => {
  const hoverControllerRef = useRef<HTMLDivElement>(null)
  const toggleControllerRef = useRef<HTMLButtonElement>(null)
  const { product, selectedSize, selectedVariant, sizeOptions } = useProductState()
  const { onSelectSize } = useProductActions()
  const { handle, title, featuredImage, variants, displayName, productGroup } = product
  const { title: collectionTitle, description, productTitle } = productGroup?.reference ?? {}
  const [firstVariant] = variants?.nodes ?? []

  const { price, compareAtPrice } = getDisplayPrices(
    firstVariant as ProductVariant,
    selectedVariant as ProductVariant,
  )

  const titleDisplay = displayName?.value ?? title
  const collectionTitleDisplay = productTitle?.value ?? collectionTitle

  const priceSize = size === 'xs' ? 'md' : 'lg'
  const variantOverlaySize = (() => {
    switch (size) {
      case 'sm':
      case 'xs':
        return size

      default:
        return 'md'
    }
  })()

  return (
    <div className={clsx(styles.card, styles[size])} ref={hoverControllerRef}>
      <div className={styles.imageBlock}>
        <div className={styles.tagWrapper}>
          <ProductTag tag="Sale" />
          <ProductTag tag="Best Seller" variant="secondary" />
        </div>
        <WishlistButton className={styles.wishlistButton} />

        <VariantOverlay
          className={styles.variantOverlay}
          size={variantOverlaySize}
          sizeOptions={sizeOptions}
          defaultVariant={firstVariant as ProductVariant}
          selectedVariant={selectedVariant as ProductVariant}
          selectedSize={selectedSize}
          hoverControllerRef={hoverControllerRef}
          toggleControllerRef={toggleControllerRef}
          onSelectSize={onSelectSize}
        />
        {featuredImage && <Image className={styles.image} data={featuredImage} />}
      </div>
      <div className={styles.contentBlock}>
        <div className={styles.titleBlock}>
          <ProductTitle size={size === 'xs' ? 'sm' : 'md'}>{titleDisplay}</ProductTitle>

          <div className={styles.pricesWrapper}>
            {compareAtPrice && <Price size={priceSize} variant="compare-at" {...compareAtPrice} />}
            <Price size={priceSize} bold {...price} />
            <ButtonIcon
              className={styles.bagButton}
              size="xs"
              icon={<AddToBagIcon />}
              variant="minimal"
              ref={toggleControllerRef}
            />
          </div>
        </div>
        <p>{collectionTitleDisplay}</p>
        {/* TODO: get message display from CMS */}
        <MessageCard title="Message" variant="positive" minimal />
      </div>
      <Link className={styles.link} to={`/products/${handle}`} />
    </div>
  )
}

const RecommendedProductCard = ({ product, ...props }: RecommendedProductCardProps) => {
  return (
    <ProductContext product={product}>
      <RecommendedProductCardInner {...props} />
    </ProductContext>
  )
}

export default RecommendedProductCard

// TODO: add this icon in UI Library
const AddToBagIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.6141 28.9745C25.4956 28.9745 27.8315 26.6385 27.8315 23.7571C27.8315 20.8756 25.4956 18.5397 22.6141 18.5397C19.7327 18.5397 17.3968 20.8756 17.3968 23.7571C17.3968 26.6385 19.7327 28.9745 22.6141 28.9745Z"
      stroke="black"
      strokeWidth="1.65079"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.8754 23.757H24.3536"
      stroke="black"
      strokeWidth="1.65079"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M22.6143 22.0178V25.496"
      stroke="black"
      strokeWidth="1.65079"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
    <path
      d="M14 29.3333H4V9.33325H22.6667V15.7849"
      stroke="black"
      strokeWidth="1.65079"
      strokeLinejoin="round"
    />
    <path
      d="M8 12.1904V3.93646C8 3.23515 8.56853 2.66663 9.26984 2.66663H18.1587C18.86 2.66663 19.4285 3.23515 19.4285 3.93646V12.1904"
      stroke="black"
      strokeWidth="1.65079"
    />
  </svg>
)
