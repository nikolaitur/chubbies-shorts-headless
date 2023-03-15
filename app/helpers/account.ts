import { Storefront } from '@shopify/hydrogen'
import { Customer, CustomerAccessTokenCreatePayload } from '@shopify/hydrogen/storefront-api-types'
import { AppLoadContext, redirect } from '@shopify/remix-oxygen'
import { AuthFields } from '~/global-types'
import { LOGIN_MUTATION } from '~/graphql/storefront/account/mutations'
import { CUSTOMER_QUERY } from '~/graphql/storefront/account/queries'

export async function login(storefront: Storefront, { email, password }: AuthFields) {
  const data = await storefront.mutate<{
    customerAccessTokenCreate: CustomerAccessTokenCreatePayload
  }>(LOGIN_MUTATION, {
    variables: {
      input: {
        email,
        password,
      },
    },
  })

  if (data?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    return data.customerAccessTokenCreate.customerAccessToken.accessToken
  }

  /**
   * Something is wrong with the user's input.
   */
  throw new Error(data?.customerAccessTokenCreate?.customerUserErrors.join(', '))
}

export async function logout(context: AppLoadContext) {
  const { session, storefront } = context
  session.unset('customerAccessToken')

  // @ts-expect-error - Hydrogen team to fix type error
  return redirect(`${storefront.i18n.pathPrefix}/account/login`, {
    headers: {
      'Set-Cookie': await session.commit(),
    },
  })
}

export async function fetchCustomer(context: AppLoadContext, customerAccessToken = '') {
  const { storefront } = context

  const data = await storefront.query<{
    customer: Customer
  }>(CUSTOMER_QUERY, {
    variables: {
      customerAccessToken,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  })

  /**
   * If the customer failed to load, we assume their access token is invalid.
   */
  if (!data || !data.customer) {
    return null
    // temporary disable
    // throw await logout(context)
  }

  return data.customer
}
