import styles from './styles.module.css'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import Accordion, {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@solo-brands/ui-library.ui.atomic.accordion'
import clsx from 'clsx'
import { CollectionFiltersProps } from './types'
import SwatchSelector from '@solo-brands/ui-library.ui.atomic.swatch-selector'

const CollectionFilters = ({ className }: CollectionFiltersProps) => {
  const sizeVariants = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']
  const selectedSize = 'XS'
  const colorVariants = ['#3B53AA', '#D9D9D9', '#1F2846']
  return (
    <div className={clsx(styles.filters, className)}>
      <div className={styles.priceFilter}>
        <div className={styles.filterHeader}>
          <div className={styles.heading}>Price</div>
          <div className={styles.clear}>clear</div>
        </div>
        <div className={styles.filterBody}>
          <div>
            {/* TODO: RANGE SELECTOR */}
            PRICE RANGE SELECTOR
          </div>
        </div>
      </div>
      <div className={styles.sizeFilter}>
        <div className={styles.filterHeader}>
          <div className={styles.heading}>Size</div>
          <div className={styles.clear}>clear</div>
        </div>
        <div className={styles.filterBody}>
          <div className={styles.sizeFilterSelector}>
            {sizeVariants.map(variant => {
              return (
                <VariantSelector
                  selected={selectedSize === variant}
                  key={variant}
                  size="md"
                  option={variant}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.colorfilter}>
        <div className={styles.filterHeader}>
          <div className={styles.heading}>Color</div>
          <div className={styles.clear}>clear</div>
        </div>
        <div className={styles.filterBody}>
          <Accordion data-testid="accordion" size="sm">
            <AccordionItem>
              <AccordionButton>Normal</AccordionButton>
              <AccordionPanel>
                <div className={styles.colorFilterSelector}>
                  {colorVariants.map(variant => {
                    return (
                      <SwatchSelector
                        key={variant}
                        variant="one-color"
                        colors={[variant]}
                        option={variant}
                      />
                    )
                  })}
                </div>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default CollectionFilters
