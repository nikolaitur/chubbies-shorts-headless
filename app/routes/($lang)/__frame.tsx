import { Outlet, useLoaderData } from '@remix-run/react'
import { json, LoaderArgs } from '@shopify/remix-oxygen'
import { CartProvider } from '~/components/cart-context/cart-context'
import { ImageData, LoaderData } from '~/global-types'
import type { CollectionNavImages, MainFrameMenus } from '~/graphql/generated'
import { COLLECTION_NAV_IMAGES } from '~/graphql/storefront/global/queries/collectionNavImage'
import { MainFrameMenusQuery } from '~/graphql/storefront/global/queries/mainFrameMenus'
import { fetchGlobalSettings } from '~/helpers'
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

  const globalSettings = await fetchGlobalSettings(
    storefront,
    { handle: 'usa' },
    mainFrameCacheStrategy,
  )

  const {
    promoBarAnnouncements,
    promoBarMenuHandle,
    footerMenuHandle,
    legalLinksMenuHandle,
    headerNavMenuHandle,
    brandLogo,
    cartBlocksAboveCartItems,
    shippingEstimates,
    cartTitle,
    cartKeepShoppingText,
    cartKeepShoppingLink,
    cartEmptyCartEmoji,
    cartEmptyMessage,
    cartEmptyButtonText,
    cartEmptyButtonCtaLink,
    outOfStockMessaging,
    shippingTiers,
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

  return json({
    promoBarAnnouncements,
    promoBarMenu,
    headerNavMenu,
    footerMenu,
    legalLinksMenu,
    navCollectionImages,
    brandLogo,
    cartBlocksAboveCartItems,
    shippingEstimates,
    cartSettings: {
      cartTitle,
      cartKeepShoppingText,
      cartKeepShoppingLink,
      cartEmptyCartEmoji,
      cartEmptyMessage,
      cartEmptyButtonText,
      cartEmptyButtonCtaLink,
    },
    outOfStockMessaging,
    shippingTiers,
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
    cartBlocksAboveCartItems,
    shippingTiers,
  } = (useLoaderData() as LoaderData['frame']) ?? {}

  return (
    <CartProvider>
      <PromoBar announcements={promoBarAnnouncements?.references?.nodes} menuLinks={promoBarMenu} />
      <Header
        menu={headerNavMenu}
        brandLogo={brandLogo?.reference?.image as ImageData}
        navImages={navCollectionImages?.nodes}
        cartBlocksAboveCartItems={cartBlocksAboveCartItems}
      />
      <Outlet />
      <Footer menu={footerMenu} legalLinks={legalLinksMenu} />
      <CartSlider
        cartBlocksAboveCartItems={cartBlocksAboveCartItems}
        shippingTiers={shippingTiers}
      />
    </CartProvider>
  )
}
