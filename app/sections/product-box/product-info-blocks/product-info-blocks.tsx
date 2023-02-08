import ProductCauseBanner from '../product-cause-banner'
import { InfoBlockProps, ProductInfoBlocksProps } from './types'

const InfoBlock = ({ type, fields }: InfoBlockProps) => {
  switch (type) {
    case 'block_cause_banner':
      return <ProductCauseBanner fields={fields} />

    //  TODO: other info blocks component

    default:
      return null
  }
}

const ProductInfoBlocks = ({ infoBlocks, ...props }: ProductInfoBlocksProps) => {
  return (
    <div {...props}>
      {infoBlocks.map(block => (
        <InfoBlock key={block.type} {...block} />
      ))}
    </div>
  )
}

export default ProductInfoBlocks
