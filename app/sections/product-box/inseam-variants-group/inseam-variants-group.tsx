import { useLocation } from '@remix-run/react'
import VariantInfo from '@solo-brands/ui-library.ui.atomic.variant-info'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import inseamIllustration from 'public/images/inseam-illustration.svg'
import { useMatches } from 'react-router'
import Link from '~/components/link'
import { PRODUCT_ROUTE_ID, UNIT_MEASUREMENT_SYMBOL } from '~/constants'
import { PdpRouteData } from '~/global-types'
import styles from './styles.module.css'
import { InseamVariantsGroupProps } from './types'

const InseamVariantsGroup = ({ size = 'xl', ...props }: InseamVariantsGroupProps) => {
  const matches = useMatches()
  const { data } = (matches.find(match => match.id === PRODUCT_ROUTE_ID) ?? {}) as PdpRouteData
  const { inseamOptions, selectedVariant } = data.product ?? {}

  const location = useLocation()

  if (!inseamOptions) return null

  const selectedInseam = inseamOptions.find(option => option.selected)
  const inseamDisplayText = `${selectedInseam?.value}${
    UNIT_MEASUREMENT_SYMBOL[selectedInseam?.unit ?? '']
  }`

  return (
    <div className={styles.wrapper} {...props}>
      <div className={styles.groupWrapper}>
        <VariantInfo size={'sm'} optionName="Inseam" optionValue={inseamDisplayText} />
        <div className={styles.inseamOptions}>
          {inseamOptions.map(({ value, unit, exists, handle, selected }, index) => (
            <Link
              key={index}
              prefetch="render"
              to={{ pathname: `/products/${handle}`, search: location.search }}
              state={location.state}
              preventScrollReset
              replace
            >
              <VariantSelector
                size={size}
                option={`${value}${UNIT_MEASUREMENT_SYMBOL[unit ?? '']}`}
                selected={selected}
                unavailableAlt={!exists}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.illustrationWrapper}>
        {/* <Image> from Hydrogen doesn't work with static asset file */}
        {/* eslint-disable-next-line hydrogen/prefer-image-component */}
        <img src={inseamIllustration} width={100} height={100} alt="Inseam Illustration" />
      </div>
    </div>
  )
}

export default InseamVariantsGroup
