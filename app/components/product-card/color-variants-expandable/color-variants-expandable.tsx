import { useLocation } from '@remix-run/react'
import clsx from 'clsx'
import { useState } from 'react'
import ColorVariantSelector from '~/components/color-variant-selector'
import Link from '~/components/link'
import { generateColorState } from '~/helpers'
import styles from './styles.module.css'
import { ColorVariantsExpandableProps } from './types'

const ColorVariantsExpandable = ({ colorOptions, size = 'md' }: ColorVariantsExpandableProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()

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
          <Link
            key={index}
            className={styles.link}
            prefetch="render"
            to={{ pathname: `/products/${handle}`, search: location.search }}
            state={generateColorState(location.state, colorOptions)}
            replace
          >
            <ColorVariantSelector size={size} colorOption={option} />
          </Link>
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
