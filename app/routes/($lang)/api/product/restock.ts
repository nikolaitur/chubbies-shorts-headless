import { ActionArgs } from '@remix-run/node'

// TODO: api for product restock
export async function action({ request }: ActionArgs) {
  const body = await request.formData()
  const email = body.get('email')

  return {
    status: 200,
    data: {
      email,
    },
  }
}
