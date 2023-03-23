import { useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { useState } from 'react'
import ColorVariantSelector from '~/components/color-variant-selector'
import { LinkWrapper } from '../color-variants-carousel/color-variants-carousel'
import styles from './styles.module.css'
import { ColorVariantsExpandableProps } from './types'

const ColorVariantsExpandable = ({
  colorOptions,
  size = 'md',
  type,
}: ColorVariantsExpandableProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()

  const isVariantProductBox = type === 'product-box'
  const columnCount = 7
  const shouldSliceColorOptions = colorOptions.length > columnCount
  const slicedColorOptions = shouldSliceColorOptions ? colorOptions.slice(0, columnCount) : null
  const remainingColorsCount = colorOptions.length - columnCount
  const colorsToShow = (() => {
    if (!shouldSliceColorOptions || isExpanded) return colorOptions

    return slicedColorOptions
  })()

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {colorsToShow?.map(({ handle, ...option }, index) => (
          <LinkWrapper
            shouldWrap={isVariantProductBox}
            handle={handle}
            colorOptions={colorOptions}
            key={index}
          >
            <ColorVariantSelector size={size} colorOption={option} />
          </LinkWrapper>
        ))}
      </div>
      {shouldSliceColorOptions && (
        <button
          className={clsx(styles.expandButton, styles[size])}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '-' : `+${remainingColorsCount}`}
        </button>
      )}
    </div>
  )
}

export default ColorVariantsExpandable
