import { useFetcher } from '@remix-run/react'
import { CartLine } from '@shopify/hydrogen/storefront-api-types'
import CartItem from '@solo-brands/ui-library.ui.shared.cart-item'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import { ClientOnly } from 'remix-utils'
import { CartAction } from '~/global-types'

export type Size = 'md' | 'sm'

export type CartLineItemProps = HTMLAttributes<HTMLDivElement> & {
  line: CartLine
}

const CartLineItem = ({ line, ...props }: CartLineItemProps, ref: Ref<HTMLDivElement>) => {
  const { id, quantity = 0, merchandise } = line || {}
  const { product, title } = merchandise || {}
  // @ts-expect-error TODO: add types for metafield query
  const { displayName, inseamLength, title: productTitle } = product || {}

  const prevQuantity = Math.max(0, quantity - 1)
  const nextQuantity = quantity + 1

  const productLength = JSON.parse(inseamLength?.value ?? 'null')

  const lineDescription = `${displayName?.value || productTitle} - ${
    productLength?.value
  }" - ${title}`

  const fetcher = useFetcher()

  const handleIncrease = () => {
    const formData = new FormData()
    formData.append('cartAction', CartAction.UPDATE_CART)
    formData.append('lines', `[{"id":"${id}","quantity":${nextQuantity}}]`)

    try {
      fetcher.submit(formData, { method: 'post', action: '/api/cart' })
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error increasing cart line quantity', error)
    }
  }

  const handleDecrease = () => {
    const formData = new FormData()
    formData.append('cartAction', CartAction.UPDATE_CART)
    formData.append('lines', `[{"id":"${id}","quantity":${prevQuantity}}]`)

    try {
      fetcher.submit(formData, { method: 'post', action: '/api/cart' })
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error decreasing cart line quantity', error)
    }
  }

  const handleRemove = () => {
    const formData = new FormData()
    formData.append('cartAction', CartAction.REMOVE_FROM_CART)
    formData.append('linesIds', `["${id}"]`)

    try {
      fetcher.submit(formData, { method: 'post', action: '/api/cart' })
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error removing cart line', error)
    }
  }

  const qtySelectorProps = {
    handleDecrease,
    handleIncrease,
  }

  return (
    <ClientOnly>
      {() => (
        <div ref={ref} {...props}>
          <CartItem
            size="sm"
            line={line}
            qtySelectorProps={qtySelectorProps}
            state={fetcher.state}
            onClickDeleteHandler={handleRemove}
            lineDescription={lineDescription}
          />
        </div>
      )}
    </ClientOnly>
  )
}

export default forwardRef(CartLineItem)
