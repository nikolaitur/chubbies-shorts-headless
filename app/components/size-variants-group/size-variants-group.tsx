import VariantInfo from '@solo-brands/ui-library.ui.atomic.variant-info'
import clsx from 'clsx'
import { useLocation } from 'react-router'
import Link from '~/components/link'
import SizeVariantSelector from '~/components/size-variant-selector'
import { SIZE_OPTION_NAME } from '~/constants'
import { getSizeTextDisplay } from '~/helpers'
import styles from './styles.module.css'
import { LinkWrapperProps, SizeVariantsGroupProps } from './types'

const LinkWrapper = ({ shouldWrap, children, optionName }: LinkWrapperProps) => {
  const { pathname, state } = useLocation()

  return shouldWrap ? (
    <Link
      prefetch="render"
      to={{ pathname, search: `?${SIZE_OPTION_NAME}=${optionName}` }}
      state={state}
      replace
      preventScrollReset
    >
      {children}
    </Link>
  ) : (
    <>{children}</>
  )
}

const SizeVariantsGroup = ({
  size = 'xl',
  variant = 'default',
  sizeOptions,
  selectedSize,
  onSelectSize,
  ...props
}: SizeVariantsGroupProps) => {
  if (!sizeOptions) return null

  const isVariantProductBox = variant === 'product-box'

  return (
    <div className={clsx(styles.wrapper, styles[variant])} {...props}>
      <VariantInfo
        size="sm"
        optionName={SIZE_OPTION_NAME}
        optionValue={selectedSize ? getSizeTextDisplay(selectedSize) : ''}
      />
      <div className={clsx(styles.sizeOptions, 'size-options')}>
        {sizeOptions.map((option, index) => (
          <LinkWrapper shouldWrap={isVariantProductBox} optionName={option.name} key={index}>
            <SizeVariantSelector
              key={index}
              size={size}
              selectedSize={selectedSize}
              sizeOption={option}
              onSelectSize={!isVariantProductBox ? onSelectSize : undefined}
            />
          </LinkWrapper>
        ))}
      </div>
    </div>
  )
}

export default SizeVariantsGroup
