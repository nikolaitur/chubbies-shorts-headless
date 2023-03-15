import { ActionArgs, ActionFunction, LoaderArgs, redirect } from '@shopify/remix-oxygen'
import { logout } from '~/helpers/account'

export async function loader({ context }: LoaderArgs) {
  // @ts-expect-error - Hydrogen team to fix type error
  return redirect(context.storefront.i18n.pathPrefix)
}

export const action: ActionFunction = async ({ context }: ActionArgs) => {
  return logout(context)
}
