import {
  type ActionArgs,
  type ActionFunction,
  type AppLoadContext,
  type LoaderArgs,
} from '@shopify/remix-oxygen'

export async function doLogout(context: AppLoadContext) {
  const { session } = context
  session.unset('customerAccessToken')

  // The only file where I have to explicitly type cast i18n to pass typecheck
  // @ts-expect-error @shopify/remix-oxygen type problem
  return redirect(`${context.storefront.i18n.pathPrefix}/account/login`, {
    headers: {
      'Set-Cookie': await session.commit(),
    },
  })
}

export async function loader({ context }: LoaderArgs) {
  // @ts-expect-error - Hydrogen team to update i18n type
  return redirect(context.storefront.i18n.pathPrefix)
}

export const action: ActionFunction = async ({ context }: ActionArgs) => {
  return doLogout(context)
}
