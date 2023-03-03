import { Link, useLocation, useMatches } from '@remix-run/react'
import clsx from 'clsx'
import { useState } from 'react'
import { generateColorState } from '~/helpers'
import ProductBoxSwatchSelector from '../product-box-swatch-selector'
import styles from './styles.module.css'
import { ColorVariantsExpandableProps } from './types'

const ColorVariantsExpandable = ({ colorOptions, size = 'md' }: ColorVariantsExpandableProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const location = useLocation()
  const matches = useMatches()

  const columnCount = 7
  const initialColorsToShow = colorOptions.slice(0, columnCount)
  const remainingColorsCount = colorOptions.length - columnCount
  const colorsToShow = isExpanded ? colorOptions : initialColorsToShow

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {colorsToShow.map(({ handle, ...option }, index) => (
          <Link
            key={index}
            className={styles.link}
            prefetch="render"
            to={{ pathname: `/products/${handle}`, search: location.search }}
            state={generateColorState(location.state, colorOptions)}
            replace
          >
            <ProductBoxSwatchSelector size={size} colorOption={option} />
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
