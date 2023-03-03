import { useMatches } from '@remix-run/react'
import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import { HeartIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import ProductTitle from '@solo-brands/ui-library.ui.atomic.product-title'
import Ratings from '@solo-brands/ui-library.ui.atomic.ratings'
import { PRODUCT_ROUTE_ID } from '~/constants'
import { PdpRouteData } from '~/global-types'
import { getDisplayPrices } from '~/helpers'
import styles from './styles.module.css'
import { ProductInfosProps } from './types'

const ProductInfos = (props: ProductInfosProps) => {
  const matches = useMatches()
  const { data } = (matches.find(match => match.id === PRODUCT_ROUTE_ID) ?? {}) as PdpRouteData
  const { title, collectionTitle, description, selectedVariant, variants } = data.product ?? {}
  const [firstVariant] = variants?.nodes ?? []

  const { price, compareAtPrice } = getDisplayPrices(
    firstVariant as ProductVariant,
    selectedVariant as ProductVariant,
  )

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.collectionTitleWrapper}>
        {collectionTitle && <p className={styles.collectionTitle}>{collectionTitle}</p>}
        <ButtonIcon size="sm" variant="minimal" icon={<HeartIcon />}></ButtonIcon>
      </div>

      <div className={styles.titleWrapper}>
        {title && <ProductTitle responsiveSize={{ sm: 'md', md: 'lg' }}>{title}</ProductTitle>}

        <div className={styles.pricesWrapperDesktop}>
          {compareAtPrice && <Price size="sm" variant="compare-at" {...compareAtPrice} />}
          <Price size="xl" bold {...price} />
        </div>
      </div>

      {/* TODO - Metafield Rich Text Description from Shopify */}
      {description && <p className={styles.description}>{description}</p>}

      <Ratings variant="number-only" size="sm" ratings={4.5} reviewsCount={300} />

      <div className={styles.pricesWrapperMobile}>
        {compareAtPrice && <Price size="sm" variant="compare-at" {...compareAtPrice} />}
        <Price size="xl" bold {...price} />
      </div>
    </div>
  )
}

export default ProductInfos
