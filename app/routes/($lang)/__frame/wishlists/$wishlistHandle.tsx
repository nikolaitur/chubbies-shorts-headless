import { Await, useRouteLoaderData } from '@remix-run/react'
import { ActionArgs, defer, json, LoaderArgs } from '@shopify/remix-oxygen'
import { Suspense } from 'react'
import { ClientOnly } from 'remix-utils'
import { LoaderData } from '~/global-types'

export async function loader({
  params,
  request,
  context: { storefront, wishlistKing },
}: LoaderArgs) {
  const { wishlistHandle } = params

  return defer({
    wishlist: null,
  })
}

export async function action(args: ActionArgs) {
  const { request } = args

  switch (request.method) {
    case 'POST':
      return await postAction(args)
    case 'PUT':
      return await putAction(args)
    case 'DELETE':
      return await deleteAction(args)
  }

  throw json(
    { message: 'Wishlist action method does not exist' },
    { status: 405, statusText: 'Method Not Allowed' },
  )
}

async function postAction({ request, context: { wishlistKing } }: ActionArgs) {
  const formData = await request.formData()

  const productId = parseInt(formData.get('productId')?.toString() ?? '')
  if (!Number.isInteger(productId)) {
    throw json(
      { message: 'Product id required (number)' },
      { status: 400, statusText: 'Bad Request' },
    )
  }

  const variantId = parseInt(formData.get('variantId')?.toString() ?? '')

  return wishlistKing
    .addWishlistItem({
      productId,
      variantId: Number.isInteger(variantId) ? variantId : undefined,
    })
    .then(json)
}

async function deleteAction({ request, context: { wishlistKing } }: ActionArgs) {
  const formData = await request.formData()

  const wishlistItemId = formData.get('wishlistItemId')?.toString()
  if (!wishlistItemId) {
    throw json(
      { message: 'Wishlist item id is required (string)' },
      { status: 400, statusText: 'Bad Request' },
    )
  }

  return wishlistKing
    .removeWishlistItem({
      wishlistItemId,
    })
    .then(json)
}

async function putAction({ request, context: { wishlistKing } }: ActionArgs) {
  const formData = await request.formData()

  const wishlistItemId = formData.get('wishlistItemId')?.toString()
  if (!wishlistItemId) {
    throw json(
      { message: 'Wishlist item id is required (string)' },
      { status: 400, statusText: 'Bad Request' },
    )
  }

  const variantId = parseInt(formData.get('variantId')?.toString() ?? '')
  if (!Number.isInteger(variantId)) {
    throw json(
      { message: 'Variant id change required (number)' },
      { status: 400, statusText: 'Bad Request' },
    )
  }

  return wishlistKing
    .updateWishlistItem({
      wishlistItemId,
      changes: {
        variantId,
      },
    })
    .then(json)
}

const WishlistPage = () => {
  const { wishlist } = useRouteLoaderData('root') as LoaderData['root']

  return (
    <ClientOnly>
      {() => (
        <Suspense fallback={<p>Loading</p>}>
          <Await resolve={wishlist} errorElement={<p>Failed to load</p>}>
            {wishlist =>
              wishlist?.items.map(item => (
                <div key={item.id}>
                  <p>Item ID: {item.id}</p>
                  <p>Product ID: {item.productId}</p>
                  <p>Variant ID: {item.variantId}</p>
                </div>
              ))
            }
          </Await>
        </Suspense>
      )}
    </ClientOnly>
  )
}

export default WishlistPage
