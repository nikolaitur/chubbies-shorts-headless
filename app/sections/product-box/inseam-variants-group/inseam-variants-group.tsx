import { useLocation } from '@remix-run/react'
import { Image } from '@shopify/hydrogen'
import VariantInfo from '@solo-brands/ui-library.ui.atomic.variant-info'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import { useMatches } from 'react-router'
import Link from '~/components/link'
import { PRODUCT_ROUTE_ID, UNIT_MEASUREMENT_SYMBOL } from '~/constants'
import { PdpRouteData } from '~/global-types'
import styles from './styles.module.css'
import { InseamVariantsGroupProps } from './types'

const InseamVariantsGroup = ({ size = 'xl', ...props }: InseamVariantsGroupProps) => {
  const matches = useMatches()
  const location = useLocation()

  const { data } = (matches.find(match => match.id === PRODUCT_ROUTE_ID) ?? {}) as PdpRouteData
  const { inseamOptions, inseamImage } = data.product ?? {}
  const flattenedImage = inseamImage?.reference?.mediaImage?.reference?.image

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
      {flattenedImage && (
        <div className={styles.illustrationWrapper}>
          <Image data={flattenedImage} />
        </div>
      )}
    </div>
  )
}

export default InseamVariantsGroup
