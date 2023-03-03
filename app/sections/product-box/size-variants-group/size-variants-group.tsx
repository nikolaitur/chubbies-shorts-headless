import { Link, useSearchParams } from '@remix-run/react'
import VariantInfo from '@solo-brands/ui-library.ui.atomic.variant-info'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import { useLocation, useMatches } from 'react-router'
import { PRODUCT_ROUTE_ID, SIZE_OPTION_NAME } from '~/constants'
import { PdpRouteData } from '~/global-types'
import { getSizeTextDisplay } from '~/helpers'
import styles from './styles.module.css'
import { SizeVariantsGroupProps } from './types'

const SizeVariantsGroup = ({ size = 'xl', ...props }: SizeVariantsGroupProps) => {
  const { pathname, state } = useLocation()
  const matches = useMatches()
  const [searchParams] = useSearchParams()
  const { data } = (matches.find(match => match.id === PRODUCT_ROUTE_ID) ?? {}) as PdpRouteData
  const { sizeOptions } = data.product ?? {}
  const selectedSize = searchParams.get(SIZE_OPTION_NAME)

  if (!sizeOptions) return null

  return (
    <div className={styles.wrapper} {...props}>
      <VariantInfo
        size={'sm'}
        optionName={SIZE_OPTION_NAME}
        optionValue={getSizeTextDisplay(selectedSize ?? sizeOptions[0].name)}
      />
      <div className={styles.sizeOptions}>
        {sizeOptions.map(({ name, exists, availableForSale }, index) => (
          <Link
            key={index}
            prefetch="render"
            to={{ pathname, search: `?${SIZE_OPTION_NAME}=${name}` }}
            state={state}
            replace
            preventScrollReset
          >
            <VariantSelector
              className={styles.variantSelector}
              option={getSizeTextDisplay(name)}
              size={size}
              selected={selectedSize === name}
              disabled={exists && !availableForSale}
              unavailableAlt={!exists}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SizeVariantsGroup
