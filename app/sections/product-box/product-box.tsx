import Container from '~/components/container'
import Section from '~/components/section'
import ProductInfoBlocks from './product-info-blocks'
import { ProductBoxProps } from './types'

const ProductBox = ({ product, ...props }: ProductBoxProps) => {
  const { infoBlocks } = product ?? {}
  const flattenedInfoBlocks = infoBlocks?.references?.nodes

  return (
    <Section {...props}>
      <Container>
        {flattenedInfoBlocks && <ProductInfoBlocks infoBlocks={flattenedInfoBlocks} />}
      </Container>
    </Section>
  )
}

export default ProductBox
