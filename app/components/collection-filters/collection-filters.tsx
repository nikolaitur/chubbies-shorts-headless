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
import { useLocation, useNavigate, useSearchParams } from '@remix-run/react'
import { CollectionFiltersProps } from './types'
import { COLOR_FILTER_KEY, PRICE_FILTER_KEY, SIZE_FILTER_KEY } from '~/constants'
import { encodeBtoa } from '~/helpers'

const CollectionFilters = ({ className, facets }: CollectionFiltersProps) => {
  const { pathname, state } = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const navigateOptions = {
    replace: true,
    state,
  }
  const priceFacet = facets?.find(facet => facet?.field === PRICE_FILTER_KEY)
  const sizeFacet = facets?.find(facet => facet?.field === SIZE_FILTER_KEY)
  const colorFacet = facets?.find(facet => facet?.field === COLOR_FILTER_KEY)

  const sizeVariants = sizeFacet?.values
  const colorVariants = colorFacet?.values

  const [minPriceRange, maxPriceRange] = [0, 200]
  const [minPriceActive, maxPriceActive] = priceFacet?.active as number[]

  const removeSearchParamsKeyValuePair = (key: string, value: string) => {
    const newEntries = searchParams.getAll(key).filter(entry => entry !== value)
    searchParams.delete(key)
    newEntries.map(entry => searchParams.append(key, entry))
  }

  const changePriceValue = (minVal: number, maxVal: number) => {
    if (minVal === minPriceActive && maxVal === maxPriceActive) return

    searchParams.set(`filter.${PRICE_FILTER_KEY}.low`, minVal.toString())
    searchParams.set(`filter.${PRICE_FILTER_KEY}.high`, maxVal.toString())

    navigate({ pathname, search: searchParams.toString() }, navigateOptions)
  }

  const updateSizeFilter = (size: any) => {
    if (size?.active === true) {
      removeSearchParamsKeyValuePair(`filter.${SIZE_FILTER_KEY}`, size?.value)
    } else {
      searchParams.append(`filter.${SIZE_FILTER_KEY}`, size?.value)
    }

    navigate({ pathname, search: searchParams.toString() }, navigateOptions)
  }

  const updateColorFilter = (color: any) => {
    // UPDATE URL FOR THIS
    const encodedValue = encodeBtoa(color?.label)
    if (color?.active === true) {
      removeSearchParamsKeyValuePair(`filter.${COLOR_FILTER_KEY}`, encodedValue)
    } else {
      searchParams.append(`filter.${COLOR_FILTER_KEY}`, encodedValue)
    }

    navigate({ pathname, search: searchParams.toString() }, navigateOptions)
  }

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
              <div className={styles.minText}>{minPriceActive}</div>
              <div className={styles.maxText}>{maxPriceActive}</div>
            </div>
            <SliderFilterControl
              className={styles.rangeInput}
              min={minPriceRange ?? 0}
              max={maxPriceRange ?? 0}
              minValue={minPriceActive ?? 0}
              maxValue={maxPriceActive ?? 0}
              onChangeValueHandler={(min, max) => changePriceValue(min, max)}
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
            {sizeVariants?.map(size => {
              const { active, value } = size || {}
              return (
                <VariantSelector
                  key={`${value}-size-filter`}
                  selected={active}
                  size="md"
                  option={value}
                  onClick={() => updateSizeFilter(size)}
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
                  {colorVariants?.map(color => {
                    const { active, value, label } = color
                    const image = value?.image?.reference?.image
                    return (
                      <SwatchSelector
                        key={label}
                        image={image}
                        selected={active}
                        onClick={() => updateColorFilter(color)}
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
