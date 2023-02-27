import type {
  Cart as CartType,
  CartBuyerIdentityInput,
  CartLineInput,
  CartLineUpdateInput,
  CartUserError,
  UserError,
} from '@shopify/hydrogen/storefront-api-types'
import { json, type ActionArgs } from '@shopify/remix-oxygen'
import invariant from 'tiny-invariant'
import { CartAction, CartActions } from '~/global-types'
import {
  cartAdd,
  cartCreate,
  cartDiscountCodesUpdate,
  cartRemove,
  cartUpdate,
  cartUpdateBuyerIdentity,
  isLocalPath,
} from '~/helpers'

export async function action({ request, context }: ActionArgs) {
  const { session, storefront } = context
  const headers = new Headers()

  const [formData, storedCartId, customerAccessToken] = await Promise.all([
    request.formData(),
    session.get('cartId'),
    session.get('customerAccessToken'),
  ])

  let cartId = storedCartId

  const cartAction = formData.get('cartAction') as CartActions
  invariant(cartAction, 'No cartAction defined')

  const countryCode = formData.get('countryCode')
    ? (formData.get('countryCode') as CartBuyerIdentityInput['countryCode'])
    : null

  let status = 200
  let result: {
    cart: CartType
    errors?: CartUserError[] | UserError[]
  }

  switch (cartAction) {
    case CartAction.ADD_TO_CART: {
      const lines = formData.get('lines')
        ? (JSON.parse(String(formData.get('lines'))) as CartLineInput[])
        : ([] as CartLineInput[])
      invariant(lines.length, 'No lines to add')

      /**
       * If no previous cart exists, create one with the lines.
       */
      if (!cartId) {
        result = await cartCreate({
          input: countryCode ? { lines, buyerIdentity: { countryCode } } : { lines },
          storefront,
        })
      } else {
        result = await cartAdd({
          cartId,
          lines,
          storefront,
        })
      }

      cartId = result.cart.id
      break
    }
    case CartAction.REMOVE_FROM_CART: {
      const lineIds = formData.get('linesIds')
        ? (JSON.parse(String(formData.get('linesIds'))) as CartType['id'][])
        : ([] as CartType['id'][])
      invariant(lineIds.length, 'No lines to remove')

      result = await cartRemove({
        cartId,
        lineIds,
        storefront,
      })

      cartId = result.cart.id

      break
    }
    case CartAction.UPDATE_CART: {
      const updateLines = formData.get('lines')
        ? (JSON.parse(String(formData.get('lines'))) as CartLineUpdateInput[])
        : ([] as CartLineUpdateInput[])
      invariant(updateLines.length, 'No lines to update')

      result = await cartUpdate({
        cartId,
        lines: updateLines,
        storefront,
      })

      cartId = result.cart.id

      break
    }
    case CartAction.UPDATE_DISCOUNT: {
      invariant(cartId, 'Missing cartId')

      const formDiscountCode = formData.get('discountCode')
      const discountCodes = ([formDiscountCode] || ['']) as string[]

      result = await cartDiscountCodesUpdate({
        cartId,
        discountCodes,
        storefront,
      })

      cartId = result.cart.id

      break
    }
    case CartAction.UPDATE_BUYER_IDENTITY: {
      const buyerIdentity = formData.get('buyerIdentity')
        ? (JSON.parse(String(formData.get('buyerIdentity'))) as CartBuyerIdentityInput)
        : ({} as CartBuyerIdentityInput)

      result = cartId
        ? await cartUpdateBuyerIdentity({
            cartId,
            buyerIdentity: {
              ...buyerIdentity,
              customerAccessToken,
            },
            storefront,
          })
        : await cartCreate({
            input: {
              buyerIdentity: {
                ...buyerIdentity,
                customerAccessToken,
              },
            },
            storefront,
          })

      cartId = result.cart.id

      break
    }
    default:
      invariant(false, `${cartAction} cart action is not defined`)
  }

  /**
   * The Cart ID may change after each mutation. We need to update it each time in the session.
   */
  session.set('cartId', cartId)
  headers.set('Set-Cookie', await session.commit())

  const redirectTo = formData.get('redirectTo') ?? null
  if (typeof redirectTo === 'string' && isLocalPath(redirectTo)) {
    status = 303
    headers.set('Location', redirectTo)
  }

  const { cart, errors } = result
  return json(
    {
      cart,
      errors,
      analytics: {
        cartId,
      },
    },
    { status, headers },
  )
}
