import type {
  Cart as CartType,
  CartBuyerIdentityInput,
  CartInput,
  CartLineInput,
  CartLineUpdateInput,
  CartUserError,
  UserError,
} from '@shopify/hydrogen/storefront-api-types'
import { type AppLoadContext } from '@shopify/remix-oxygen'
import invariant from 'tiny-invariant'
import {
  ADD_LINES_MUTATION,
  CREATE_CART_MUTATION,
  DISCOUNT_CODES_UPDATE,
  LINES_UPDATE_MUTATION,
  REMOVE_LINE_ITEMS_MUTATION,
  UPDATE_CART_BUYER_COUNTRY,
} from '~/graphql/storefront/cart/mutations'

/**
 * Create a cart with line(s) mutation
 * @param input CartInput https://shopify.dev/api/storefront/2022-01/input-objects/CartInput
 * @see https://shopify.dev/api/storefront/2022-01/mutations/cartcreate
 * @returns result {cart, errors}
 * @preserve
 */
export async function cartCreate({
  input,
  storefront,
}: {
  input: CartInput
  storefront: AppLoadContext['storefront']
}) {
  const { cartCreate } = await storefront.mutate<{
    cartCreate: {
      cart: CartType
      errors: CartUserError[]
    }
    errors: UserError[]
  }>(CREATE_CART_MUTATION, {
    variables: { input },
  })

  invariant(cartCreate, 'No data returned from cartCreate mutation')

  return cartCreate
}

/**
 * Storefront API cartLinesAdd mutation
 * @param cartId
 * @param lines [CartLineInput!]! https://shopify.dev/api/storefront/2022-01/input-objects/CartLineInput
 * @see https://shopify.dev/api/storefront/2022-01/mutations/cartLinesAdd
 * @returns result {cart, errors}
 * @preserve
 */
export async function cartAdd({
  cartId,
  lines,
  storefront,
}: {
  cartId: string
  lines: CartLineInput[]
  storefront: AppLoadContext['storefront']
}) {
  const { cartLinesAdd } = await storefront.mutate<{
    cartLinesAdd: {
      cart: CartType
      errors: CartUserError[]
    }
  }>(ADD_LINES_MUTATION, {
    variables: { cartId, lines },
  })

  invariant(cartLinesAdd, 'No data returned from cartLinesAdd mutation')

  return cartLinesAdd
}

/**
 * Create a cart with line(s) mutation
 * @param cartId the current cart id
 * @param lineIds [ID!]! an array of cart line ids to remove
 * @see https://shopify.dev/api/storefront/2022-07/mutations/cartlinesremove
 * @returns mutated cart
 * @preserve
 */
export async function cartRemove({
  cartId,
  lineIds,
  storefront,
}: {
  cartId: string
  lineIds: CartType['id'][]
  storefront: AppLoadContext['storefront']
}) {
  const { cartLinesRemove } = await storefront.mutate<{
    cartLinesRemove: { cart: CartType; errors: UserError[] }
  }>(REMOVE_LINE_ITEMS_MUTATION, {
    variables: {
      cartId,
      lineIds,
    },
  })

  invariant(cartLinesRemove, 'No data returned from remove lines mutation')
  return cartLinesRemove
}

/**
 * Update cart line(s) mutation
 * @param cartId the current cart id
 * @param lineIds [ID!]! an array of cart line ids to remove
 * @see https://shopify.dev/api/storefront/2022-07/mutations/cartlinesremove
 * @returns mutated cart
 * @preserve
 */
export async function cartUpdate({
  cartId,
  lines,
  storefront,
}: {
  cartId: string
  lines: CartLineUpdateInput[]
  storefront: AppLoadContext['storefront']
}) {
  const { cartLinesUpdate } = await storefront.mutate<{
    cartLinesUpdate: { cart: CartType; errors: UserError[] }
  }>(LINES_UPDATE_MUTATION, {
    variables: { cartId, lines },
  })

  invariant(cartLinesUpdate, 'No data returned from update lines items mutation')
  return cartLinesUpdate
}

/**
 * Mutation to update a cart buyerIdentity
 * @param cartId  Cart['id']
 * @param buyerIdentity CartBuyerIdentityInput
 * @returns {cart: Cart; errors: UserError[]}
 * @see API https://shopify.dev/api/storefront/2022-10/mutations/cartBuyerIdentityUpdate
 * @preserve
 */
export async function cartUpdateBuyerIdentity({
  cartId,
  buyerIdentity,
  storefront,
}: {
  cartId: string
  buyerIdentity: CartBuyerIdentityInput
  storefront: AppLoadContext['storefront']
}) {
  const { cartBuyerIdentityUpdate } = await storefront.mutate<{
    cartBuyerIdentityUpdate: { cart: CartType; errors: UserError[] }
  }>(UPDATE_CART_BUYER_COUNTRY, {
    variables: {
      cartId,
      buyerIdentity,
    },
  })

  invariant(cartBuyerIdentityUpdate, 'No data returned from cart buyer identity update mutation')

  return cartBuyerIdentityUpdate
}

/**
 * Mutation that updates the cart discounts
 * @param discountCodes Array of discount codes
 * @returns mutated cart
 * @preserve
 */
export async function cartDiscountCodesUpdate({
  cartId,
  discountCodes,
  storefront,
}: {
  cartId: string
  discountCodes: string[]
  storefront: AppLoadContext['storefront']
}) {
  const { cartDiscountCodesUpdate } = await storefront.mutate<{
    cartDiscountCodesUpdate: { cart: CartType; errors: UserError[] }
  }>(DISCOUNT_CODES_UPDATE, {
    variables: {
      cartId,
      discountCodes,
    },
  })

  invariant(cartDiscountCodesUpdate, 'No data returned from the cartDiscountCodesUpdate mutation')

  return cartDiscountCodesUpdate
}
