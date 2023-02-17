import { UnionToIntersection } from 'type-fest'
import Container from '~/components/container'
import Section from '~/components/section'
import { PdpMediaFragment } from '~/graphql/generated'
import ProductGallery from './product-gallery'
import ProductInfoBlocks from './product-info-blocks'
import ProductVariants from './product-variants'
import styles from './styles.module.css'
import { ProductBoxProps } from './types'

const ProductBox = ({ product, ...props }: ProductBoxProps) => {
  const { infoBlocks, media } = product ?? {}
  const flattenedMedia = media?.nodes as UnionToIntersection<PdpMediaFragment>[]
  const flattenedInfoBlocks = infoBlocks?.references?.nodes

  return (
    <Section {...props}>
      <Container>
        <div className={styles.productBox}>
          {flattenedMedia && <ProductGallery media={flattenedMedia} />}
          <div className={styles.productBoxDetails}>
            <ProductVariants />
            {flattenedInfoBlocks && <ProductInfoBlocks infoBlocks={flattenedInfoBlocks} />}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default ProductBox
