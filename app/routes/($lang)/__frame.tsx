import { Outlet, useLoaderData } from '@remix-run/react'
import { json, LoaderArgs } from '@shopify/remix-oxygen'
import { GlobalSettings, MainFrameMenus } from '~/graphql/generated'
import { GLOBAL_SETTINGS_QUERY } from '~/graphql/storefront/global/queries/globalSettings'
import { MainFrameMenusQuery } from '~/graphql/storefront/global/queries/mainFrameMenus'
import CartSlider from '~/sections/cart-slider'
import Footer from '~/sections/footer'
import Header from '~/sections/header'
import Navigation from '~/sections/navigation'
import PromoBar from '~/sections/promo-bar'

export async function loader({ context }: LoaderArgs) {
  const { storefront } = context
  const mainFrameCacheStrategy = storefront.CacheCustom({
    mode: 'must-revalidate',
    maxAge: 15,
    sMaxAge: 59,
    staleWhileRevalidate: 60,
    staleIfError: 600,
  })
  const { globalSettings } = await storefront.query<GlobalSettings>(GLOBAL_SETTINGS_QUERY, {
    variables: {
      //TODO: Make this dynamic based on current locale
      globalSettingsHandle: 'usa',
    },
    cache: mainFrameCacheStrategy,
  })
  const { promoBarAnnouncements, promoBarMenuHandle, footerMenuHandle, legalLinksMenuHandle } =
    globalSettings || {}
  const { promoBarMenu, footerMenu, legalLinksMenu } = await storefront.query<MainFrameMenus>(
    MainFrameMenusQuery,
    {
      variables: {
        promoBarMenuHandle: promoBarMenuHandle?.value,
        footerMenuHandle: footerMenuHandle?.value,
        legalLinksMenuHandle: legalLinksMenuHandle?.value,
      },
      cache: mainFrameCacheStrategy,
    },
  )
  return json({
    promoBarMenu,
    footerMenu,
    legalLinksMenu,
    promoBarAnnouncements,
  })
}

export default function MainFrame() {
  const { promoBarMenu, footerMenu, legalLinksMenu, promoBarAnnouncements } =
    useLoaderData<typeof loader>()
  return (
    <>
      <Header>
        <PromoBar
          announcements={promoBarAnnouncements?.references?.nodes}
          menuLinks={promoBarMenu}
        />
        <Navigation />
      </Header>
      <Outlet />
      <Footer menu={footerMenu} legalLinks={legalLinksMenu} />
      <CartSlider />
    </>
  )
}
