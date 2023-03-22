import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import ProductTitle from '@solo-brands/ui-library.ui.atomic.product-title'
import Ratings from '@solo-brands/ui-library.ui.atomic.ratings'
import WishlistButton from '~/components/wishlist-button'
import { ROUTE_IDS } from '~/constants'
import { LoaderData } from '~/global-types'
import { getDisplayPrices } from '~/helpers'
import { useTypedRouteLoaderData, useYotpoBottomline } from '~/hooks'
import styles from './styles.module.css'
import { ProductInfosProps } from './types'

const ProductInfos = (props: ProductInfosProps) => {
  const { product } = useTypedRouteLoaderData<LoaderData['product']>(ROUTE_IDS.PRODUCT) ?? {}
  const { id, title, collectionTitle, description, selectedVariant, variants } = product ?? {}
  const [firstVariant] = variants?.nodes ?? []

  const { price, compareAtPrice } = getDisplayPrices(
    firstVariant as ProductVariant,
    selectedVariant as ProductVariant,
  )
  const { averageScore, totalReviews } = useYotpoBottomline(id)

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.collectionTitleWrapper}>
        {collectionTitle && <p className={styles.collectionTitle}>{collectionTitle}</p>}
        <WishlistButton productId={product?.id} variantId={product?.selectedVariant?.id} />
      </div>

      <div className={styles.titleWrapper}>
        {title && <ProductTitle responsiveSize={{ sm: 'md', md: 'lg' }}>{title}</ProductTitle>}

        <div className={styles.pricesWrapperDesktop}>
          {compareAtPrice && <Price size="sm" variant="compare-at" {...compareAtPrice} />}
          <Price size="xl" bold {...price} />
        </div>
      </div>

      {description && <div className={styles.richTextWrapper}>{description}</div>}

      <Ratings variant="number-only" size="sm" ratings={averageScore} reviewsCount={totalReviews} />

      <div className={styles.pricesWrapperMobile}>
        {compareAtPrice && <Price size="sm" variant="compare-at" {...compareAtPrice} />}
        <Price size="xl" bold {...price} />
      </div>
    </div>
  )
}

export default ProductInfos
