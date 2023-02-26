import { Outlet, useLoaderData } from '@remix-run/react'
import { json, LoaderArgs } from '@shopify/remix-oxygen'
import type { CollectionNavImages, GlobalSettings, MainFrameMenus } from '~/graphql/generated'
import { COLLECTION_NAV_IMAGES } from '~/graphql/storefront/global/queries/collectionNavImage'
import { GLOBAL_SETTINGS_QUERY } from '~/graphql/storefront/global/queries/globalSettings'
import { MainFrameMenusQuery } from '~/graphql/storefront/global/queries/mainFrameMenus'
import CartSlider from '~/sections/cart-slider'
import Footer from '~/sections/footer'
import HeaderNavigation from '~/sections/header-navigation'
import PromoBar from '~/sections/promo-bar'
import Header from '~/sections/header'

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
  /*
  headerNavMenu?.items?.forEach(item => {
    item?.items?.forEach(innerItem => {
      if (innerItem.resourceId?.includes('/Collection/')) {
        const collectionImage = navCollectionImages.nodes?.find(
          collection => collection?.id === innerItem.resourceId,
        )
        if (collectionImage) {
          //@ts-expect-error how do we add a new property to MenuItem?
          innerItem.image = collectionImage?.navigation_image?.reference?.image
        }
      }
    })
  })*/

  //retrieve images for the mega menu
  return json({
    promoBarAnnouncements,
    promoBarMenu,
    headerNavMenu,
    footerMenu,
    legalLinksMenu,
    navCollectionImages,
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
  } = useLoaderData<typeof loader>()

  return (
    <>
      <Header>
        <PromoBar
          announcements={promoBarAnnouncements?.references?.nodes}
          menuLinks={promoBarMenu}
        />
        {/*/@ts-expect-error TODO: navImages types looks like correct, but I can`t resolve TS error*/}
        <HeaderNavigation menu={headerNavMenu} navImages={navCollectionImages?.nodes} />
      </Header>
      <Outlet />
      <Footer menu={footerMenu} legalLinks={legalLinksMenu} />
      <CartSlider />
    </>
  )
}
