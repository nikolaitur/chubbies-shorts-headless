import { CustomerCreatePayload } from '@shopify/hydrogen/storefront-api-types'
import { ActionFunction, json, redirect } from '@shopify/remix-oxygen'
import { REGISTER_MUTATION } from '~/graphql/storefront/account/mutations'
import { login } from '~/helpers/account'

type ActionData = {
  formError?: string
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request, context, params }) => {
  const { session, storefront } = context
  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')
  const firstName = formData.get('firstName')
  const lastName = formData.get('lastName')

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return badRequest({
      formError: 'Please provide both an email and a password.',
    })
  }

  try {
    const data = await storefront.mutate<{
      customerCreate: CustomerCreatePayload
    }>(REGISTER_MUTATION, {
      variables: {
        input: { email, password, firstName, lastName },
      },
    })

    if (!data?.customerCreate?.customer?.id) {
      /**
       * Something is wrong with the user's input.
       */
      throw new Error(data?.customerCreate?.customerUserErrors.join(', '))
    }

    const customerAccessToken = await login(context.storefront, { email, password })
    session.set('customerAccessToken', customerAccessToken)

    return redirect(params.lang ? `${params.lang}/account` : '/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    })
  } catch (error: any) {
    if (storefront.isApiError(error)) {
      return badRequest({
        formError: 'Something went wrong. Please try again later.',
      })
    }

    /**
     * The user did something wrong, but the raw error from the API is not super friendly.
     * Let's make one up.
     */
    return badRequest({
      formError:
        'Sorry. We could not create an account with this email. User might already exist, try to login instead.',
    })
  }
}
