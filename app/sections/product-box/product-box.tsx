import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import { UnionToIntersection } from 'type-fest'
import ATCButton from '~/components/atc-button'
import Container from '~/components/container'
import Section from '~/components/section'
import { PdpMediaFragment } from '~/graphql/generated'
import ProductGallery from './product-gallery'
import ProductInfoBlocks from './product-info-blocks'
import ProductInfos from './product-infos'
import ProductVariants from './product-variants'
import styles from './styles.module.css'
import { ProductBoxProps } from './types'

const ProductBox = ({ product, ...props }: ProductBoxProps) => {
  const { infoBlocks, media, selectedVariant, variants } = product ?? {}
  const flattenedMedia = media?.nodes as UnionToIntersection<PdpMediaFragment>[]
  const flattenedInfoBlocks = infoBlocks?.references?.nodes
  const firstVariant = variants.nodes[0]

  return (
    <Section {...props}>
      <Container>
        <div className={styles.productBox}>
          {flattenedMedia && <ProductGallery media={flattenedMedia} />}
          <div className={styles.details}>
            <ProductInfos />
            <ProductVariants />
            <ATCButton
              defaultVariant={firstVariant as ProductVariant}
              selectedVariant={selectedVariant as ProductVariant}
            />
            {flattenedInfoBlocks && <ProductInfoBlocks infoBlocks={flattenedInfoBlocks} />}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default ProductBox
