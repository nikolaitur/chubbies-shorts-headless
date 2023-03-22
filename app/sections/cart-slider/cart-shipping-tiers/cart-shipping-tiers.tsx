import { useMatches } from '@remix-run/react'
import ShippingMessageCard from '@solo-brands/ui-library.ui.shared.shipping-message-card'
import { forwardRef, HTMLAttributes, Ref, useEffect } from 'react'
import { useCartActions } from '~/components/cart-context/cart-context'
import { GlobalSettingsQuery } from '~/graphql/generated'
import styles from './styles.module.css'

export type CartShippingTiersProps = HTMLAttributes<HTMLElement> & {
  shippingTiers?: NonNullable<
    NonNullable<NonNullable<GlobalSettingsQuery['globalSettings']>['shippingTiers']>['references']
  >['nodes']
}

const CartShippingTiers = (
  { shippingTiers, ...props }: CartShippingTiersProps,
  ref: Ref<HTMLDivElement>,
) => {
  const [root] = useMatches()
  const { cost } = root.data.cart ?? {}
  const { subtotalAmount } = cost ?? {}
  const subtotalFloat = parseFloat(subtotalAmount?.amount ?? '0')

  const { setFreeShippingText } = useCartActions()

  // Mutate data to match props from ui-library
  const tiers = shippingTiers?.map(tier => {
    const threshold = JSON.parse(tier?.tierAmount?.value ?? 'null')

    return {
      emoji: tier?.emoji?.value ?? '',
      id: tier?.id ?? '',
      primary_message: tier?.primaryMessage?.value ?? '',
      secondary_message: tier?.secondaryMessage?.value ?? '',
      completion_message: tier?.completionMessage?.value ?? '',
      cart_footer_success_message: tier?.cartFooterSuccessMessage?.value ?? '',
      tier_amount: parseFloat(threshold?.amount ?? '0'),
    }
  })

  const firstTier = tiers?.[0]
  const tierAmount = firstTier?.tier_amount ?? 0

  useEffect(() => {
    if (firstTier?.cart_footer_success_message && subtotalFloat >= tierAmount) {
      setFreeShippingText(firstTier?.cart_footer_success_message ?? '')
    } else {
      setFreeShippingText('')
    }
  }, [subtotalAmount])

  return (
    <div className={styles.shippingTiers} ref={ref} {...props}>
      {tiers && (
        <ShippingMessageCard
          variant="minimal"
          tiers={tiers}
          subtotalPrice={subtotalFloat}
          brand="chubbies"
        />
      )}
    </div>
  )
}

export default forwardRef(CartShippingTiers)
