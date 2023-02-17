import VariantInfo from '@solo-brands/ui-library.ui.atomic.variant-info'
import clsx from 'clsx'
import ColorVariantsCarousel from '../color-variants-carousel'
import ColorVariantsExpandable from '../color-variants-expandable'
import styles from './styles.module.css'
import { ColorVariantsGroupProps } from './types'

const colors = [
  {
    hex: '#000000',
  },
  {
    hex: '#36454F',
  },
  {
    hex: '#023020',
  },
  {
    hex: '#301934',
  },
  {
    hex: '#343434',
  },
  {
    hex: '#1B1212',
  },
  {
    hex: '#28282B',
  },
  {
    hex: '#191970',
  },
  {
    hex: '#353935',
  },
  {
    hex: '#B2BEB5',
  },
  {
    hex: '#7393B3',
  },
  {
    hex: '#A9A9A9',
  },
  {
    hex: '#71797E',
  },
  {
    hex: '#848884',
  },
  {
    hex: '#E5E4E2',
  },
]

const ColorVariantsGroup = ({
  size = 'md',
  variant = 'inline',
  ...props
}: ColorVariantsGroupProps) => {
  return (
    <div className={clsx(styles.wrapper, styles[size])} {...props}>
      <VariantInfo size={'sm'} optionName="Color" optionValue="Value" />
      {variant !== 'expandable' ? (
        <ColorVariantsCarousel colors={colors} size={size} variant={variant} />
      ) : (
        <ColorVariantsExpandable colors={colors} size={size} />
      )}
    </div>
  )
}

export default ColorVariantsGroup
