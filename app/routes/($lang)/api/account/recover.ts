import { CustomerRecoverPayload } from '@shopify/hydrogen/storefront-api-types'
import { ActionFunction, json } from '@shopify/remix-oxygen'
import { RECOVER_MUTATION } from '~/graphql/storefront/account/mutations'

type ActionData = {
  formError?: string
  resetRequested?: boolean
}

const badRequest = (data: ActionData) => json(data, { status: 400 })

export const action: ActionFunction = async ({ request, context }) => {
  const formData = await request.formData()
  const email = formData.get('email')

  if (!email || typeof email !== 'string') {
    return badRequest({
      formError: 'Please provide an email.',
    })
  }

  try {
    await context.storefront.mutate<{
      customerRecover: CustomerRecoverPayload
    }>(RECOVER_MUTATION, {
      variables: { email },
    })

    return json({ resetRequested: true, email })
  } catch (error: any) {
    return badRequest({
      formError: 'Something went wrong. Please try again later.',
    })
  }
}
