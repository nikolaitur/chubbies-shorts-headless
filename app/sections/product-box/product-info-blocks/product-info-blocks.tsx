import ProductAccordion from '../product-accordion'
import ProductAccordionGrid from '../product-accordion-grid'
import ProductBoxNosto from '../product-box-nosto'
import ProductCauseBanner from '../product-cause-banner'
import styles from './styles.module.css'
import { InfoBlockProps, ProductInfoBlocksProps } from './types'

const InfoBlock = ({ type, fields }: InfoBlockProps) => {
  switch (type) {
    case 'block_cause_banner':
      return <ProductCauseBanner fields={fields} />

    case 'block_product_accordion':
      return <ProductAccordion fields={fields} />

    case 'block_accordion_grid':
      return <ProductAccordionGrid fields={fields} />

    case 'block_nosto_placement':
      return <ProductBoxNosto fields={fields} />

    default:
      return null
  }
}

const ProductInfoBlocks = ({ infoBlocks, ...props }: ProductInfoBlocksProps) => {
  return (
    <div className={styles.wrapper} {...props}>
      {infoBlocks.map((block, index) => (
        <InfoBlock key={`${block.type}-${index}`} {...block} />
      ))}
    </div>
  )
}

export default ProductInfoBlocks
