import { useMatches, useSearchParams } from '@remix-run/react'
import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import { useEffect } from 'react'
import { UnionToIntersection } from 'type-fest'
import ATCButton from '~/components/atc-button'
import Container from '~/components/container'
import Section from '~/components/section'
import { SIZE_OPTION_NAME } from '~/constants'
import { PdpMediaFragment } from '~/graphql/generated'
import { dataLayerViewItem } from '~/utils/dataLayer'
import ProductGallery from './product-gallery'
import ProductInfoBlocks from './product-info-blocks'
import ProductInfos from './product-infos'
import ProductVariants from './product-variants'
import styles from './styles.module.css'
import { ProductBoxProps } from './types'

const ProductBox = ({ product, ...props }: ProductBoxProps) => {
  const [searchParams] = useSearchParams()

  const { infoBlocks, media, selectedVariant, variants } = product ?? {}
  const flattenedMedia = media?.nodes as UnionToIntersection<PdpMediaFragment>[]
  const flattenedInfoBlocks = infoBlocks?.references?.nodes
  const firstVariant = variants.nodes[0]
  const [root, locale, frame] = useMatches()

  useEffect(() => {
    dataLayerViewItem({ ecommerce: frame?.data?.analytics })
  }, [frame?.data?.analytics])
  const selectedSize = searchParams.get(SIZE_OPTION_NAME)

  return (
    <Section {...props}>
      <Container>
        <div className={styles.productBox}>
          {flattenedMedia && <ProductGallery media={flattenedMedia} />}
          <div className={styles.details}>
            <ProductInfos />
            <ProductVariants />
            <ATCButton
              selectedSize={selectedSize}
              defaultVariant={firstVariant as ProductVariant}
              selectedVariant={selectedVariant as ProductVariant}
              withPrice={undefined}
            />
            {flattenedInfoBlocks && <ProductInfoBlocks infoBlocks={flattenedInfoBlocks} />}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default ProductBox
