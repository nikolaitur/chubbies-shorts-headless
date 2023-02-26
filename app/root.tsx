import { cssBundleHref } from '@remix-run/css-bundle'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import { Cart } from '@shopify/hydrogen-react/storefront-api-types'
import { json, type LinksFunction, type LoaderArgs, type MetaFunction } from '@shopify/remix-oxygen'
import { BaseStyles } from '@solo-brands/ui-library.styles.global'
// @ts-expect-error there are no typings for this module
import { theme } from '@solobrands/token-library/dist/styled/chubbies'
import { createHead } from 'remix-island'
import { ThemeProvider } from 'styled-components'
import {
  createNostoCookie,
  generateNostoEventPayload,
  getNostoSessionID,
  getProductDataForRecs,
  updateNostoSession,
} from '~/helpers/nosto'
import favicon from '../public/favicon.svg'
import { CART_QUERY } from './graphql/storefront/cart/queries'

import appStyles from './styles/app.css'

// @ts-expect-error - TODO: find a way to correct the types of this
export const links: LinksFunction = () => {
  const cssBundle = { rel: 'stylesheet', href: cssBundleHref ?? '' }

  const externalLinks = [
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
    { rel: 'stylesheet', href: 'https://use.typekit.net/rkh0qht.css' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'true' },
    {
      href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
      rel: 'stylesheet',
    },
    { rel: 'stylesheet', href: appStyles },
  ]

  if (cssBundleHref) {
    externalLinks.push(cssBundle)
  }

  return externalLinks
}

export const meta: MetaFunction = data => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
})

export async function loader({ context, request, params }: LoaderArgs) {
  const { storefront } = context

  const cartId = await context.session.get('cartId')

  const [cart] = await Promise.all([
    cartId
      ? (
          await storefront.query<{ cart: Cart }>(CART_QUERY, {
            variables: {
              cartId,
            },
            cache: storefront.CacheNone(),
          })
        ).cart
      : null,
  ])
  //Placeholder for customer info
  const customer = {}
  const headers: HeadersInit = []

  const destination = request.headers.get('sec-fetch-dest')
  /* Generate Nosto Session  */
  const nostoAPIKey = context.env.NOSTO_API_APPS_TOKEN
  const nostoSessionID = await getNostoSessionID(request, nostoAPIKey)
  headers.push(createNostoCookie(nostoSessionID))

  //TODO: [CHU-184] Remove await when Remix bug is fixed
  const recommendedProducts = await generateNostoEventPayload(storefront, request, params)
    .then(payload => updateNostoSession(payload, nostoAPIKey, nostoSessionID))
    .then(placements => getProductDataForRecs(storefront, placements))

  //TODO: [CHU-184] Change to defer when Remix bug is fixed this is fixed
  return json(
    {
      cart,
      nosto: recommendedProducts,
    },
    {
      headers: new Headers(headers),
    },
  )
}

//TODO: add Head back to main return when Xiphe/remix-island is no longer needed (facebook/react#24430)
export const Head = createHead(() => (
  <>
    <Meta />
    <Links />
  </>
))

export default function App() {
  const data = useLoaderData<typeof loader>()

  return (
    <>
      <Head />
      <ThemeProvider theme={theme}>
        <BaseStyles />
        <Outlet />
      </ThemeProvider>
      <ScrollRestoration />
      <Scripts />
    </>
  )
}
