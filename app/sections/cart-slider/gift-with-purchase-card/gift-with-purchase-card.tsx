// import Carousel from '@solo-brands/ui-library.ui.atomic.carousel'
import { Image } from '@shopify/hydrogen'
import { CurrencyCode } from '@shopify/hydrogen/storefront-api-types'
import { CheckIcon, LockIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import cx from 'clsx'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import styles from './styles.module.css'

export type GiftWithPurchaseCardProps = HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean
  selected?: boolean
  // TO-DO: temporary set as boolean for markup
  sizes?: boolean
}

const GiftWithPurchaseCard = (
  { disabled = false, selected = true, sizes = false, ...props }: GiftWithPurchaseCardProps,
  ref: Ref<HTMLDivElement>,
) => {
  return (
    <div className={cx(styles.card, { [styles.isSelected]: selected })} ref={ref} {...props}>
      {(disabled || selected) && (
        <div
          className={cx(
            styles.icon,
            { [styles.isSelected]: selected },
            { [styles.isDisabled]: disabled },
          )}
        >
          {selected ? <CheckIcon size="xs" /> : <LockIcon size="xs" />}
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.image}
            data={{
              altText: 'test',
              url: 'https://cdn.shopify.com/s/files/1/0077/0432/products/ChubbiesIconsKoozie2Pack_SD_949213-02_6770_2400.webp?v=1669065020',
            }}
          />
        </div>
        {sizes ? <Sizes /> : <DescriptionAndPrice />}
      </div>
      {disabled && <div className={styles.disabledOverlay} />}
    </div>
  )
}

const DescriptionAndPrice = () => {
  // TO-DO: Logic here

  return (
    <div className={styles.details}>
      <p className={styles.description}>
        Spend $385.00+ and get the reversible can jacket 2 pack for free!
      </p>
      {/* TO-DO: Display string FREE is price is 0 */}
      <Price amount="0" currencyCode={'USD' as CurrencyCode} />
    </div>
  )
}

const Sizes = () => {
  // TO-DO: Logic here

  return (
    <div className={styles.details}>
      <p className={styles.description}>Select a size</p>
      {/* TO-DO: Display string FREE is price is 0 */}
      <div className={styles.sizes}>
        <VariantSelector
          size="xs"
          option="XS"
          price={{
            amount: '1395.0',
            currencyCode: 'USD' as CurrencyCode,
          }}
        />
        <VariantSelector
          size="xs"
          option="S"
          price={{
            amount: '1395.0',
            currencyCode: 'USD' as CurrencyCode,
          }}
        />
        <VariantSelector
          size="xs"
          option="M"
          price={{
            amount: '1395.0',
            currencyCode: 'USD' as CurrencyCode,
          }}
        />
      </div>
    </div>
  )
}

export default forwardRef(GiftWithPurchaseCard)
