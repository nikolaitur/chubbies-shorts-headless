import type {
  Attribute,
  Cart as CartType,
  CartBuyerIdentityInput,
  CartInput,
  CartLineEdge,
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

export const getCartCompareAtPrice = (lines: CartLineEdge[]) =>
  lines
    ?.reduce((total, line) => {
      const {
        node: { cost, quantity },
      } = line || {}

      const totalCompareAtAmountPerQuantity =
        parseFloat(cost?.compareAtAmountPerQuantity?.amount ?? '0') * quantity

      const totalAmountPerQuantity = parseFloat(cost?.amountPerQuantity?.amount ?? '0') * quantity

      const amount = totalCompareAtAmountPerQuantity ?? totalAmountPerQuantity

      return total + amount
    }, 0)
    .toString()

export const getComputedAmount = (
  value1: number | string,
  value2: number | string,
  operator: 'add' | 'subtract' | 'multiply' | 'divide',
) => {
  const parsedValue1 = typeof value1 === 'number' ? value1 : parseFloat(value1)
  const parsedValue2 = typeof value2 === 'number' ? value2 : parseFloat(value2)

  switch (operator) {
    case 'add':
      return (parsedValue1 + parsedValue2).toString()

    case 'subtract':
      return (parsedValue1 - parsedValue2).toString()

    case 'multiply':
      return (parsedValue1 * parsedValue2).toString()

    case 'divide':
      return (parsedValue1 / parsedValue2).toString()

    default:
      return '0'
  }
}

export const getCartLineAttributes = (attributes: Attribute[]) => {
  const GWP_KEY = '_isGwpProduct'

  const getSpecificCustomAttribute = (key: string) => {
    return attributes?.find(attr => attr?.key === key)?.value || null
  }

  const isGwpProduct = getSpecificCustomAttribute(GWP_KEY)

  return {
    isGwpProduct,
  }
}

interface CartLineItem {
  node: {
    merchandise: {
      id: string
      sku: string
      product: {
        title: string
      }
      price: {
        amount: string
      }
    }
    quantity: number
  }
}

export const generateCartAnalytics = (lines: CartLineEdge[] | undefined) => {
  return {
    ecommerce: {
      items: lines?.map((item: any, index: number) => {
        return {
          index: index + 1,
          price: parseFloat(item?.node?.merchandise?.price?.amount),
          quantity: item?.node?.quantity,
          item_id: item?.node?.merchandise.sku,
          item_name: item?.node?.merchandise?.product?.title,
          item_brand: 'Chubbies',
          item_variant: item?.node?.merchandise.id,
        }
      }),
      currency: 'USD',
      view_cart_type: 'Cart Preview',
    },
  }
}

export const generateCartRemoveAnalytics = (line: any | undefined) => {
  const { quantity = 0, merchandise } = line || {}
  return {
    ecommerce: {
      items: [
        {
          price: parseFloat(merchandise?.price?.amount),
          quantity,
          item_id: merchandise.sku,
          item_name: merchandise?.product?.title,
          item_brand: 'Chubbies',
          item_variant: merchandise.id,
        },
      ],
      currency: 'USD',
    },
  }
}
