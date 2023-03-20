import { cssBundleHref } from '@remix-run/css-bundle'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { Storefront } from '@shopify/hydrogen'
import { Cart } from '@shopify/hydrogen-react/storefront-api-types'
import { json, type LinksFunction, type LoaderArgs, type MetaFunction } from '@shopify/remix-oxygen'
import { BaseStyles } from '@solo-brands/ui-library.styles.global'
// @ts-expect-error there are no typings for this module
import { theme } from '@solobrands/token-library/dist/styled/chubbies'
import { createHead } from 'remix-island'
import { ThemeProvider } from 'styled-components'
import {
  createNostoCookie,
  fetchAllMessagingCampaigns,
  generateNostoEventPayload,
  getEnrichedNostoPlacements,
  getNostoSessionID,
  updateNostoSession,
} from '~/helpers'

import favicon from '../public/favicon.svg'
import { CART_QUERY } from './graphql/storefront/cart/queries'
import { fetchCustomer } from './helpers/account'

import appStyles from './styles/app.css'
import ThirdPartyScripts from './thirdPartyScripts'

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
  const { storefront, session, env } = context

  const headers: HeadersInit = []
  const destination = request.headers.get('sec-fetch-dest')

  // account
  const customerAccessToken: string = await session.get('customerAccessToken')
  const isAuthenticated = Boolean(customerAccessToken)
  const customer = await fetchCustomer(context, customerAccessToken)

  // cart
  const cartId = await session.get('cartId')
  const cart = cartId ? await getCart(storefront, cartId) : undefined

  // Generate Nosto Session
  const nostoAPIKey = env.NOSTO_API_APPS_TOKEN
  const nostoSessionID = await getNostoSessionID(request, nostoAPIKey)
  headers.push(createNostoCookie(nostoSessionID))

  // messaging campaigns
  const messagingCampaigns = await fetchAllMessagingCampaigns(storefront)
  const campaignsWithTriggeringTags = messagingCampaigns.nodes.filter(
    node => node.fields.find(field => field.key === 'triggering_tag')?.value,
  )

  const nostoEventPayload = await generateNostoEventPayload(storefront, request.url, params)
  const initialNostoPlacements = await updateNostoSession(
    nostoEventPayload,
    nostoAPIKey,
    nostoSessionID,
  )
  const enrichedNostoPlacements = await getEnrichedNostoPlacements(
    storefront,
    initialNostoPlacements,
  )

  //TODO: [CHU-184] Change to defer when Remix bug is fixed this is fixed
  return json(
    {
      cart,
      isAuthenticated,
      customer,
      nostoPlacements: enrichedNostoPlacements,
      selectedLocale: storefront.i18n,
      messagingCampaigns: campaignsWithTriggeringTags,
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
  return (
    <>
      <Head />
      <ThirdPartyScripts />
      <ThemeProvider theme={theme}>
        <BaseStyles />
        <Outlet />
        <div id="portal" />
      </ThemeProvider>
      <ScrollRestoration />
      <Scripts />
    </>
  )
}

export async function getCart(storefront: Storefront, cartId: string) {
  const { cart } = await storefront.query<{ cart?: Cart }>(CART_QUERY, {
    variables: {
      cartId,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  })

  return cart
}
