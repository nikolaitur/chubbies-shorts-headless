import { useLocation, useMatches } from '@remix-run/react'
import VariantInfo from '@solo-brands/ui-library.ui.atomic.variant-info'
import clsx from 'clsx'
import { PRODUCT_ROUTE_ID } from '~/constants'
import { PdpRouteData } from '~/global-types'
import { moveInitialColorFirst } from '~/helpers'
import ColorVariantsCarousel from '../color-variants-carousel'
import ColorVariantsExpandable from '../color-variants-expandable'
import styles from './styles.module.css'
import { ColorGroupProps, ColorVariantsGroupProps } from './types'

const ColorVariantsGroup = ({
  className,
  size = 'xl',
  variant = 'inline',
  ...props
}: ColorVariantsGroupProps) => {
  const matches = useMatches()
  const { data } = (matches.find(match => match.id === PRODUCT_ROUTE_ID) ?? {}) as PdpRouteData
  const { colorOptionsByGroup } = data.product ?? {}
  const groups = Object.keys(colorOptionsByGroup ?? {})
  if (!colorOptionsByGroup) return null

  return (
    <div className={clsx(styles.wrapper, className)} {...props}>
      {groups.map((group, index) => {
        const colorOptions = colorOptionsByGroup?.[group]

        if (!colorOptions) return null

        return (
          <ColorGroup
            key={index}
            groupName={group}
            colorOptions={colorOptions}
            size={size}
            variant={variant}
          />
        )
      })}
    </div>
  )
}

const ColorGroup = ({ groupName, colorOptions, size, variant }: ColorGroupProps) => {
  const { state } = useLocation()
  const selectedColorName = colorOptions.find(option => option.selected)?.name
  const sortedColorOptions = colorOptions.sort(moveInitialColorFirst(state))

  return (
    <div className={styles.groupWrapper}>
      <VariantInfo size={'sm'} optionName={groupName} optionValue={selectedColorName ?? ''} />
      {variant !== 'expandable' ? (
        <ColorVariantsCarousel colorOptions={sortedColorOptions} size={size} variant={variant} />
      ) : (
        <ColorVariantsExpandable colorOptions={sortedColorOptions} size={size} />
      )}
    </div>
  )
}

export default ColorVariantsGroup
