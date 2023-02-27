import Accordion, {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@solo-brands/ui-library.ui.atomic.accordion'
import SliderFilterControl from '@solo-brands/ui-library.ui.atomic.slider-filter-control'
import SwatchSelector from '@solo-brands/ui-library.ui.atomic.swatch-selector'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import clsx from 'clsx'
import styles from './styles.module.css'
import { CollectionFiltersProps } from './types'

const CollectionFilters = ({ className }: CollectionFiltersProps) => {
  const sizeVariants = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL']
  const selectedSize = 'XS'
  const colorVariants = ['#3B53AA', '#D9D9D9', '#1F2846']

  const min = 1,
    max = 100
  const minValue = 20,
    maxValue = 80

  return (
    <div className={clsx(styles.filters, className)}>
      <div className={styles.priceFilter}>
        <div className={styles.filterHeader}>
          <div className={styles.heading}>Price</div>
          <div className={styles.clear}>clear</div>
        </div>
        <div className={styles.filterBody}>
          <div className={styles.priceRangeSelector}>
            <div className={styles.priceRangeText}>
              <div className={styles.minText}>{minValue}</div>
              <div className={styles.maxText}>{maxValue}</div>
            </div>

            <SliderFilterControl
              className={styles.rangeInput}
              min={min}
              max={max}
              minValue={minValue}
              maxValue={maxValue}
            />
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
                    return <SwatchSelector key={variant} colors={[variant]} option={variant} />
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
