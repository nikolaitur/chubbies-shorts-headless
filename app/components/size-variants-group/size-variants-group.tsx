import VariantInfo from '@solo-brands/ui-library.ui.atomic.variant-info'
import clsx from 'clsx'
import { useLocation } from 'react-router'
import Link from '~/components/link'
import SizeVariantSelector from '~/components/size-variant-selector'
import { SIZE_OPTION_NAME } from '~/constants'
import { getSizeTextDisplay } from '~/helpers'
import styles from './styles.module.css'
import { SizeVariantsGroupProps } from './types'

const SizeVariantsGroup = ({
  size = 'xl',
  variant = 'product-card',
  sizeOptions,
  selectedSize,
  onSelectSize,
  ...props
}: SizeVariantsGroupProps) => {
  const { pathname, state } = useLocation()

  if (!sizeOptions) return null

  return (
    <div className={clsx(styles.wrapper, styles[variant])} {...props}>
      <VariantInfo
        size="sm"
        optionName={SIZE_OPTION_NAME}
        optionValue={selectedSize ? getSizeTextDisplay(selectedSize) : ''}
      />
      <div className={styles.sizeOptions}>
        {sizeOptions.map((option, index) =>
          variant === 'product-box' ? (
            <Link
              key={index}
              prefetch="render"
              to={{ pathname, search: `?${SIZE_OPTION_NAME}=${option.name}` }}
              state={state}
              replace
              preventScrollReset
            >
              <SizeVariantSelector size={size} selectedSize={selectedSize} sizeOption={option} />
            </Link>
          ) : (
            <SizeVariantSelector
              key={index}
              size={size}
              selectedSize={selectedSize}
              sizeOption={option}
              onSelectSize={onSelectSize}
            />
          ),
        )}
      </div>
    </div>
  )
}

export default SizeVariantsGroup
