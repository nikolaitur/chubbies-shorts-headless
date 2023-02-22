import ProductAccordion from '../product-accordion'
import ProductAccordionGrid from '../product-accordion-grid'
import ProductCauseBanner from '../product-cause-banner'
import { InfoBlockProps, ProductInfoBlocksProps } from './types'

const InfoBlock = ({ type, fields }: InfoBlockProps) => {
  switch (type) {
    case 'block_cause_banner':
      return <ProductCauseBanner fields={fields} />

    case 'block_product_accordion':
      return <ProductAccordion fields={fields} />

    case 'block_accordion_grid':
      return <ProductAccordionGrid fields={fields} />

    // TODO
    // case 'block_nosto_placement':
    // return <>

    default:
      return null
  }
}

const ProductInfoBlocks = ({ infoBlocks, ...props }: ProductInfoBlocksProps) => {
  return (
    <div {...props}>
      {infoBlocks.map((block, index) => (
        <InfoBlock key={`${block.type}-${index}`} {...block} />
      ))}
    </div>
  )
}

export default ProductInfoBlocks
