import VariantInfo from '@solo-brands/ui-library.ui.atomic.variant-info'
import { useMatches } from 'react-router'
import { PRODUCT_ROUTE_ID } from '~/constants'
import { PdpRouteData } from '~/global-types'
import ColorVariantsCarousel from '../color-variants-carousel'
import ColorVariantsExpandable from '../color-variants-expandable'
import styles from './styles.module.css'
import { ColorGroupProps, ColorVariantsGroupProps } from './types'

const ColorVariantsGroup = ({
  size = 'xl',
  variant = 'inline',
  ...props
}: ColorVariantsGroupProps) => {
  const matches = useMatches()
  const { data } = (matches.find(match => match.id === PRODUCT_ROUTE_ID) ?? {}) as PdpRouteData
  const { colorOptions, colorOptionsByGroup } = data.product
  const groups = Object.keys(colorOptionsByGroup ?? {})

  if (!colorOptions) return null

  const selectedColorName = colorOptions.find(option => option.selected)?.name

  return (
    <div className={styles.wrapper} {...props}>
      {groups.map((group, index) => {
        const colorOptions = colorOptionsByGroup?.[group]

        if (!colorOptions) return null

        return (
          <ColorGroup
            key={index}
            groupName={group}
            colorOptions={colorOptions}
            selectedColorName={selectedColorName ?? ''}
            size={size}
            variant={variant}
          />
        )
      })}
    </div>
  )
}

const ColorGroup = ({
  groupName,
  colorOptions,
  selectedColorName,
  size,
  variant,
}: ColorGroupProps) => {
  const isSelectedGroup = colorOptions.some(option => option.name === selectedColorName)
  return (
    <div className={styles.groupWrapper}>
      <VariantInfo
        size={'sm'}
        optionName={groupName}
        optionValue={isSelectedGroup ? selectedColorName : ''}
      />
      {variant !== 'expandable' ? (
        <ColorVariantsCarousel colorOptions={colorOptions} size={size} variant={variant} />
      ) : (
        <ColorVariantsExpandable colorOptions={colorOptions} size={size} />
      )}
    </div>
  )
}

export default ColorVariantsGroup
