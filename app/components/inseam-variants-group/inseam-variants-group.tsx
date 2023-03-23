import { useLocation } from '@remix-run/react'
import { Image } from '@shopify/hydrogen'
import VariantInfo from '@solo-brands/ui-library.ui.atomic.variant-info'
import Link from '~/components/link'
import { UNIT_MEASUREMENT_SYMBOL } from '~/constants'
import InseamVariantSelector from '../inseam-variant-selector'
import styles from './styles.module.css'
import { InseamVariantsGroupProps, LinkWrapperProps } from './types'

const LinkWrapper = ({ shouldWrap, children, handle }: LinkWrapperProps) => {
  const { state, search } = useLocation()

  return shouldWrap ? (
    <Link
      prefetch="render"
      to={{ pathname: `/products/${handle}`, search }}
      state={state}
      preventScrollReset
      replace
    >
      {children}
    </Link>
  ) : (
    <>{children}</>
  )
}

const InseamVariantsGroup = ({
  size = 'xl',
  variant = 'default',
  inseamOptions,
  inseamImage,
  onSelectInseam,
  ...props
}: InseamVariantsGroupProps) => {
  if (!inseamOptions) return null

  const selectedInseam = inseamOptions.find(option => option.selected)
  const inseamDisplayText = `${selectedInseam?.value}${
    UNIT_MEASUREMENT_SYMBOL[selectedInseam?.unit ?? '']
  }`

  const isVariantProductBox = variant === 'product-box'

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.groupWrapper}>
        <VariantInfo size={'sm'} optionName="Inseam" optionValue={inseamDisplayText} />
        <div className={styles.inseamOptions}>
          {inseamOptions.map(({ handle, ...option }, index) => (
            <LinkWrapper shouldWrap={isVariantProductBox} handle={handle} key={index}>
              <InseamVariantSelector
                size={size}
                inseamOption={option}
                onSelectInseam={!isVariantProductBox ? onSelectInseam : undefined}
              />
            </LinkWrapper>
          ))}
        </div>
      </div>
      {inseamImage && (
        <div className={styles.illustrationWrapper}>
          <Image data={inseamImage} />
        </div>
      )}
    </div>
  )
}

export default InseamVariantsGroup
