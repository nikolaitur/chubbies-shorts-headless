import SwatchSelector from '@solo-brands/ui-library.ui.atomic.swatch-selector/dist/swatch-selector'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import styles from './styles.module.css'
import { ColorVariantsExpandableProps } from './types'

const ColorVariantsExpandable = ({ colors, size = 'md' }: ColorVariantsExpandableProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const columnCount = 7
  const initialColorsToShow = colors.slice(0, columnCount)
  const remainingColorsCount = colors.length - columnCount
  const colorsToShow = isExpanded ? colors : initialColorsToShow

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {colorsToShow.map((color, index) => (
          <Fragment key={index}>
            {/* Fragment is needed to add comment here, it will be remove once we don't need ts-ignore below  */}
            {/* @ts-expect-error - TODO: Update SwatchSelector types */}
            <SwatchSelector size={size} colors={[color.hex]} />
          </Fragment>
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
