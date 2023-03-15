import { ActionFunction, json, redirect } from '@shopify/remix-oxygen'
import { login } from '~/helpers/account'

type ActionData = {
  formError?: string
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request, context, params }) => {
  const formData = await request.formData()

  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return badRequest({
      formError: 'Please provide both an email and a password.',
    })
  }

  const { session, storefront } = context

  try {
    const customerAccessToken = await login(storefront, { email, password })
    session.set('customerAccessToken', customerAccessToken)

    return redirect(params.lang ? `/${params.lang}/account` : '/account', {
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
        'Sorry. We did not recognize either your email or password. Please try to sign in again or create a new account.',
    })
  }
}
