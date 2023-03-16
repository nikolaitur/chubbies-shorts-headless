// import Carousel from '@solo-brands/ui-library.ui.atomic.carousel'
import { useFetcher, useMatches } from '@remix-run/react'
import { CartLineEdge, CartLineInput } from '@shopify/hydrogen/storefront-api-types'
import { CheckIcon, LockIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import ProductImage from '@solo-brands/ui-library.ui.atomic.product-image'
import Spinner from '@solo-brands/ui-library.ui.atomic.spinner'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import cx from 'clsx'
import { forwardRef, HTMLAttributes, Ref, useState } from 'react'
import { ClientOnly } from 'remix-utils'
import { CartAction } from '~/global-types'
import { getCartLineAttributes } from '~/helpers'
import { useCartFetchers } from '~/hooks'
import { SingleProductOfferFlattenedFields } from '../gift-with-purchase/gift-with-purchase'
import styles from './styles.module.css'

export type GiftWithPurchaseCardProps = HTMLAttributes<HTMLButtonElement> & {
  data: SingleProductOfferFlattenedFields
  id: string
}

const GiftWithPurchaseCard = (
  { data, id, ...props }: GiftWithPurchaseCardProps,
  ref: Ref<HTMLButtonElement>,
) => {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [root] = useMatches()
  const cart = root.data.cart ?? {}
  const { cost, lines } = cart ?? {}
  const { subtotalAmount } = cost ?? {}

  const {
    benefit_copy,
    discount_percentage,
    internal_name,
    order_amount_threshold,
    single_gwp_product,
  } = data || {}
  const { featuredImage, variants } = single_gwp_product?.reference || {}
  const [firstVariant] = variants?.nodes ?? []

  const hasSizes = (variants?.nodes?.length ?? 0) > 1

  const fetcher = useFetcher()
  const cartFetchers = useCartFetchers(['HANDLE_GWP', 'REMOVE_FROM_CART'])
  const isCartLoading = cartFetchers?.length > 0

  const gwpToAdd: CartLineInput[] = [
    {
      merchandiseId: selectedVariant ?? firstVariant?.id,
      quantity: 1,
      attributes: [
        {
          key: '_isGwpProduct',
          value: 'true',
        },
        {
          key: '_smgift',
          value: `${discount_percentage?.value}`,
        },
        {
          key: '_smid',
          value: `${id}`,
        },
      ],
    },
  ]

  const cartLineEdges: CartLineEdge[] = lines?.edges

  // Check all existing GWP items from cart
  const existingGwpItemsFromCart = cartLineEdges?.filter(
    edge => getCartLineAttributes(edge?.node?.attributes)?.isGwpProduct,
  )

  // Check if a single GWP item already exists
  const existingGwpItem = cartLineEdges?.find(
    edge => edge?.node?.merchandise?.id === (selectedVariant ?? firstVariant?.id),
  )

  const linesToRemove = existingGwpItemsFromCart?.map(line => line?.node?.id)

  const threshold = JSON.parse(order_amount_threshold?.value ?? '0')?.amount
  const disabled = parseFloat(subtotalAmount?.amount) < parseFloat(threshold)
  const disableCartAction = isCartLoading || disabled || existingGwpItem || hasSizes

  // useEffect(() => {
  //   if ((existingGwpItem || !disabled) && linesToRemove?.length < 1) return

  //   const handleRemove = () => {
  //     const formData = new FormData()
  //     formData.append('cartAction', CartAction.REMOVE_FROM_CART)
  //     formData.append('linesIds', JSON.stringify(linesToRemove))

  //     try {
  //       fetcher.submit(formData, { method: 'post', action: '/api/cart' })
  //     } catch (error: any) {
  //       // eslint-disable-next-line no-console
  //       console.log('error removing cart line', error)
  //     }
  //   }

  //   handleRemove()
  // }, [disabled, existingGwpItem, fetcher, linesToRemove])

  return (
    <ClientOnly>
      {() => (
        <fetcher.Form action="/api/cart" method="post">
          <input type="hidden" name="cartAction" value={CartAction.HANDLE_GWP} />
          <input type="hidden" name="lines" value={JSON.stringify(gwpToAdd)} />
          <input type="hidden" name="linesIds" value={JSON.stringify(linesToRemove)} />
          <button
            className={cx(styles.card, { [styles.isSelected]: existingGwpItem || hasSizes })}
            ref={ref}
            {...props}
            type={disableCartAction ? 'button' : 'submit'}
          >
            {(disabled || existingGwpItem) && !isCartLoading && (
              <div
                className={cx(
                  styles.icon,
                  { [styles.isSelected]: existingGwpItem },
                  { [styles.isDisabled]: disabled },
                )}
              >
                {existingGwpItem ? <CheckIcon size="xs" /> : <LockIcon size="xs" />}
              </div>
            )}
            <div className={styles.content}>
              <div className={styles.imageContainer}>
                <ProductImage image={featuredImage} />
              </div>
              {hasSizes ? (
                <div className={styles.details}>
                  <p className={styles.description}>Select a size</p>
                  <div className={styles.sizes}>
                    {variants?.nodes?.map((variant, index) => {
                      const { id, selectedOptions } = variant || {}
                      const size = selectedOptions?.[0]?.value

                      const isSelected = existingGwpItem?.node?.merchandise?.id === id

                      return (
                        <button
                          key={`${id}-${index}`}
                          type="submit"
                          onClick={() => setSelectedVariant(id)}
                        >
                          <VariantSelector size="xs" option={size} selected={isSelected} />
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className={styles.details}>
                  <p className={styles.description}>{benefit_copy?.value}</p>
                  <div className={styles.priceContainer}>
                    {firstVariant?.compareAtPrice && (
                      <Price size="sm" variant="compare-at" {...firstVariant?.compareAtPrice} />
                    )}
                    {!hasSizes ? (
                      // TODO: add "free" prop to <Price> component when ui-library failing jobs are fixed
                      <p className={styles.freeText}>FREE</p>
                    ) : (
                      <Price size="sm" bold {...firstVariant?.price} />
                    )}
                  </div>
                </div>
              )}
            </div>
            <div
              className={cx(styles.disabledOverlay, {
                [styles.isShown]: disabled || isCartLoading,
              })}
            >
              {isCartLoading && <Spinner size="md" />}
            </div>
          </button>
        </fetcher.Form>
      )}
    </ClientOnly>
  )
}

export default forwardRef(GiftWithPurchaseCard)
