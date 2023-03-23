import { useLocation } from '@remix-run/react'
import VariantInfo from '@solo-brands/ui-library.ui.atomic.variant-info'
import clsx from 'clsx'
import { moveInitialColorFirst } from '~/helpers'
import ColorVariantsCarousel from './color-variants-carousel'
import ColorVariantsExpandable from './color-variants-expandable'
import styles from './styles.module.css'
import { ColorGroupProps, ColorVariantsGroupProps } from './types'

const ColorVariantsGroup = ({
  className,
  size = 'xl',
  variant = 'inline',
  colorOptionsByGroup,
  type = 'default',
  ...props
}: ColorVariantsGroupProps) => {
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
            type={type}
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

const ColorGroup = ({ groupName, colorOptions, size, variant, type }: ColorGroupProps) => {
  const { state } = useLocation()
  const selectedColorName = colorOptions.find(option => option.selected)?.name
  const sortedColorOptions = colorOptions.sort(moveInitialColorFirst(state))

  return (
    <div className={styles.groupWrapper}>
      <VariantInfo size={'sm'} optionName={groupName} optionValue={selectedColorName ?? ''} />
      {variant !== 'expandable' ? (
        <ColorVariantsCarousel
          colorOptions={sortedColorOptions}
          size={size}
          variant={variant}
          type={type}
        />
      ) : (
        <ColorVariantsExpandable colorOptions={sortedColorOptions} size={size} type={type} />
      )}
    </div>
  )
}

export default ColorVariantsGroup
