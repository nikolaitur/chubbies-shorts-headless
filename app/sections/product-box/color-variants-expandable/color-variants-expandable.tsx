import { Link, useLocation } from '@remix-run/react'
import SwatchSelector from '@solo-brands/ui-library.ui.atomic.swatch-selector/dist/swatch-selector'
import clsx from 'clsx'
import { useState } from 'react'
import styles from './styles.module.css'
import { ColorVariantsExpandableProps } from './types'

const ColorVariantsExpandable = ({ colorOptions, size = 'md' }: ColorVariantsExpandableProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()

  const columnCount = 7
  const initialColorsToShow = colorOptions.slice(0, columnCount)
  const remainingColorsCount = colorOptions.length - columnCount
  const colorsToShow = isExpanded ? colorOptions : initialColorsToShow

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {colorsToShow.map(({ image, handle, selected }, index) => (
          <Link
            key={index}
            className={styles.link}
            prefetch="render"
            to={{ pathname: `/products/${handle}`, search: location.search }}
          >
            <SwatchSelector size={size} image={image} selected={selected} />
          </Link>
        ))}
      </div>
      <button
        className={clsx(styles.expandButton, styles[size])}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? '-' : `+${remainingColorsCount}`}
      </button>
    </div>
  )
}

export default ColorVariantsExpandable
