import Container from '~/components/container'
import Section from '~/components/section'
import ProductInfoBlocks from './product-info-blocks'
import styles from './styles.module.css'
import { ProductBoxProps } from './types'

const ProductBox = ({ product, ...props }: ProductBoxProps) => {
  const { infoBlocks } = product ?? {}
  const flattenedInfoBlocks = infoBlocks?.references?.nodes

  return (
    <Section {...props}>
      <Container>
        <div className={styles.productBox}>
          <div>{/* TODO: ProductBoxCarousel */}</div>
          {flattenedInfoBlocks && <ProductInfoBlocks infoBlocks={flattenedInfoBlocks} />}
        </div>
      </Container>
    </Section>
  )
}

export default ProductBox
