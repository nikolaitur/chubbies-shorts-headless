import { cssBundleHref } from '@remix-run/css-bundle'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { Cart } from '@shopify/hydrogen-react/storefront-api-types'
import {
  defer,
  type LinksFunction,
  type LoaderArgs,
  type MetaFunction,
} from '@shopify/remix-oxygen'
import { BaseStyles } from '@solo-brands/ui-library.styles.global'
// @ts-expect-error there are no typings for this module
import { theme } from '@solobrands/token-library/dist/styled/isle'
import { ThemeProvider } from 'styled-components'
import favicon from '../public/favicon.svg'
import MainFrame from './frames/main-frame'
import { CART_QUERY } from './graphql/storefront/cart/queries'

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

export async function loader({ context, request }: LoaderArgs) {
  const cartId = await context.session.get('cartId')

  const [cart] = await Promise.all([
    cartId
      ? (
          await context.storefront.query<{ cart: Cart }>(CART_QUERY, {
            variables: {
              cartId,
              /**
              Country and language properties are automatically injected
              into all queries. Passing them is unnecessary unless you
              want to override them from the following default:
              */
              country: context.storefront.i18n?.country,
              language: context.storefront.i18n?.language,
            },
            cache: context.storefront.CacheNone(),
          })
        ).cart
      : null,
  ])

  return defer({
    cart,
  })
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <BaseStyles />
          <MainFrame>
            <Outlet />
          </MainFrame>
          <ScrollRestoration />
          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  )
}
