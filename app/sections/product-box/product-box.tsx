import { useSearchParams } from '@remix-run/react'
import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import { useEffect } from 'react'
import { UnionToIntersection } from 'type-fest'
import ATCButton from '~/components/atc-button'
import Container from '~/components/container'
import DeliveryCountdown from '~/components/delivery-countdown/delivery-countdown'
import Section from '~/components/section'
import { ROUTE_IDS, SIZE_OPTION_NAME } from '~/constants'
import { LoaderData } from '~/global-types'
import { PdpMediaFragment } from '~/graphql/generated'
import { useTypedRouteLoaderData } from '~/hooks'
import { dataLayerViewItem } from '~/utils/dataLayer'
import ProductBoxMessageCards from './product-box-message-cards'
import ProductGallery from './product-gallery'
import ProductInfoBlocks from './product-info-blocks'
import ProductInfos from './product-infos'
import ProductVariants from './product-variants'
import styles from './styles.module.css'
import { ProductBoxProps } from './types'

const ProductBox = ({ product, ...props }: ProductBoxProps) => {
  const [searchParams] = useSearchParams()
  const { analytics } = useTypedRouteLoaderData<LoaderData['product']>(ROUTE_IDS.PRODUCT) ?? {}

  const { infoBlocks, media, selectedVariant, variants } = product ?? {}
  const flattenedMedia = media?.nodes as UnionToIntersection<PdpMediaFragment>[]
  const flattenedInfoBlocks = infoBlocks?.references?.nodes
  const firstVariant = variants.nodes[0]
  const selectedSize = searchParams.get(SIZE_OPTION_NAME)

  useEffect(() => {
    dataLayerViewItem({ ecommerce: analytics ?? {} })
  }, [analytics])

  return (
    <Section {...props}>
      <Container>
        <div className={styles.productBox}>
          {flattenedMedia && <ProductGallery media={flattenedMedia} />}
          <div className={styles.details}>
            <ProductInfos />
            <ProductVariants />
            <ProductBoxMessageCards />
            <ATCButton
              selectedSize={selectedSize}
              defaultVariant={firstVariant as ProductVariant}
              selectedVariant={selectedVariant as ProductVariant}
              withPrice={undefined}
            />
            <DeliveryCountdown />
            {flattenedInfoBlocks && <ProductInfoBlocks infoBlocks={flattenedInfoBlocks} />}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default ProductBox
