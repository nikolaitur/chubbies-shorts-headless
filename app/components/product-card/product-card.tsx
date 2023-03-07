import { Image } from '@shopify/storefront-kit-react'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import { CloseIcon, HeartIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import SwatchSelector from '@solo-brands/ui-library.ui.atomic.swatch-selector'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import { ProductCardFragment } from '~/graphql/generated'
import styles from './styles.module.css'
import clsx from 'clsx'
import { Link } from '@remix-run/react'
import { Suspense, useState } from 'react'
import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import AtcButton from '~/components/atc-button'
import { useMatches } from '@remix-run/react'
import { COLLECTION_ROUTE_ID } from '~/constants/'
import { Await } from 'react-router'
import ProductSwatches from './product-swatches'
import { Inseam } from '~/global-types'

const ProductCard = ({ product }: { product: ProductCardFragment | null }) => {
  const [isQuickShopOpen, setIsQuickShopOpen] = useState(false)

  const { title, inseam_length, swatch, featuredImage, handle, variants } = product ?? {}
  const sizeVariants =
    variants?.nodes?.map(
      variant => variant?.selectedOptions?.find(option => option?.name === 'Size')?.value,
    ) || []

  const selectedSize = sizeVariants?.[0]
  const selectedVariant = variants?.nodes?.[0]

  const matches = useMatches()
  const collectionMatch = matches.find(match => match.id === COLLECTION_ROUTE_ID) ?? {}
  const { productGroups } = collectionMatch?.data || {}

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`/products/${handle}`}>
          <Image className={styles.image} data={featuredImage || {}} />
          {/* TODO: Add Hover Image, need metafield to wire data */}
          {/* <Image className={styles.hoverImage} data={hoverImage} /> */}
        </Link>
        <div className={styles.tagArea}>
          <div className={clsx(styles.tag, styles.tagPrimary)}>SALE</div>
          <div className={clsx(styles.tag, styles.tagSecondary)}>SALE</div>
        </div>
        <div className={styles.favorite}>
          <ButtonIcon
            variant="tertiary"
            size="sm"
            border="rounded"
            icon={<HeartIcon fill="#000000" />}
          />
        </div>
        <div className={clsx(styles.quickShop, { [styles.active]: isQuickShopOpen })}>
          <Button
            className={styles.quickButton}
            onClick={() => setIsQuickShopOpen(true)}
            variant="primary"
          >
            Quick Shop
          </Button>
          <div className={styles.quickCart}>
            <ButtonIcon
              className={styles.quickClose}
              variant="minimal"
              size="sm"
              border="box"
              onClick={() => setIsQuickShopOpen(false)}
              icon={<CloseIcon />}
            />
            <div className={styles.quickCartVariants}>
              <span>Variants</span>
              <div className={styles.quickCartVariantSelector}>
                {sizeVariants.map(variant => {
                  return (
                    <VariantSelector
                      selected={selectedSize === variant}
                      key={variant}
                      size="md"
                      option={variant || ''}
                    />
                  )
                })}
              </div>
            </div>
            <AtcButton
              defaultVariant={selectedVariant as ProductVariant}
              selectedVariant={selectedVariant as ProductVariant}
            />
          </div>
        </div>
      </div>
      <div className={styles.productDescription}>
        <Link to={`/products/${handle}`}>
          <h1 className={styles.title}>{title}</h1>
        </Link>
        <div className={styles.variantTitle}>Ultimate Training Short</div>
        <Price amount="199.0" />
      </div>
      {productGroups && (
        <Suspense fallback={<></>}>
          <Await resolve={productGroups}>
            {productGroups => <ProductSwatches productGroups={productGroups} product={product} />}
          </Await>
        </Suspense>
      )}
      <div className={styles.cardFooter}>
        <span>Footer text here</span>
      </div>
    </div>
  )
}

export default ProductCard
