import { Outlet, useLoaderData } from '@remix-run/react'
import { json, LoaderArgs } from '@shopify/remix-oxygen'
import { CartProvider } from '~/components/cart-context/cart-context'
import type { CollectionNavImages, GlobalSettings, MainFrameMenus } from '~/graphql/generated'
import { COLLECTION_NAV_IMAGES } from '~/graphql/storefront/global/queries/collectionNavImage'
import { GLOBAL_SETTINGS_QUERY } from '~/graphql/storefront/global/queries/globalSettings'
import { MainFrameMenusQuery } from '~/graphql/storefront/global/queries/mainFrameMenus'
import CartSlider from '~/sections/cart-slider'
import Footer from '~/sections/footer'
import Header from '~/sections/header'
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
  const {
    promoBarAnnouncements,
    promoBarMenuHandle,
    footerMenuHandle,
    legalLinksMenuHandle,
    headerNavMenuHandle,
    brandLogo,
    shippingEstimates,
  } = globalSettings || {}

  const { promoBarMenu, footerMenu, legalLinksMenu, headerNavMenu } =
    await storefront.query<MainFrameMenus>(MainFrameMenusQuery, {
      variables: {
        promoBarMenuHandle: promoBarMenuHandle?.value,
        footerMenuHandle: footerMenuHandle?.value,
        legalLinksMenuHandle: legalLinksMenuHandle?.value,
        headerNavMenuHandle: headerNavMenuHandle?.value,
      },
      cache: mainFrameCacheStrategy,
    })

  const navCollectionIds = headerNavMenu?.items?.reduce<string[]>((acc, item) => {
    item?.items?.forEach(innerItem => {
      if (innerItem.resourceId?.includes('/Collection/')) {
        acc.push(innerItem.resourceId)
      }
    })
    return acc
  }, [])
  const navCollectionImages = await storefront.query<CollectionNavImages>(COLLECTION_NAV_IMAGES, {
    variables: {
      ids: navCollectionIds,
    },
  })

  //retrieve images for the mega menu
  return json({
    promoBarAnnouncements,
    promoBarMenu,
    headerNavMenu,
    footerMenu,
    legalLinksMenu,
    navCollectionImages,
    brandLogo,
    shippingEstimates,
  })
}

export default function MainFrame() {
  const {
    promoBarMenu,
    headerNavMenu,
    footerMenu,
    legalLinksMenu,
    promoBarAnnouncements,
    navCollectionImages,
    brandLogo,
  } = useLoaderData<typeof loader>()

  return (
    <CartProvider>
      <PromoBar announcements={promoBarAnnouncements?.references?.nodes} menuLinks={promoBarMenu} />
      <Header
        menu={headerNavMenu}
        //@ts-expect-error Incorrect type from useLoaderData
        brandLogo={brandLogo?.reference?.image}
        //@ts-expect-error Incorrect type from useLoaderData
        navImages={navCollectionImages?.nodes}
      />
      <Outlet />
      <Footer menu={footerMenu} legalLinks={legalLinksMenu} />
      <CartSlider />
    </CartProvider>
  )
}
