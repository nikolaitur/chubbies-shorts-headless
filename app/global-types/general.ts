import { I18nBase } from '@shopify/hydrogen'
import {
  Cart,
  Customer,
  Image,
  Maybe,
  MetafieldReference,
  MetafieldReferenceConnection,
  MetaobjectField,
} from '@shopify/hydrogen/storefront-api-types'
import { UnionToIntersection } from 'type-fest'
import { CollectionNavImages, GlobalSettings, MainFrameMenus } from '~/graphql/generated'
import { NostoPlacement } from './nosto'

export type MetafieldReferenceV2 = UnionToIntersection<MetafieldReference>
export type MetafieldReferenceConnectionV2 = UnionToIntersection<MetafieldReferenceConnection>
export type ImageData = Maybe<Image>

export type MetaobjectFieldV2 = Omit<MetaobjectField, 'reference' | 'references'> & {
  reference?: MetafieldReferenceV2
  references?: MetafieldReferenceConnectionV2
}

export type RootLoaderData = {
  cart?: Cart
  nostoPlacements?: NostoPlacement[] | null
  selectedLocale: I18nBase
  customer: Customer | null
  isAuthenticated: boolean
}

export type MainFrameLoaderType = {
  promoBarMenu: MainFrameMenus['promoBarMenu']
  headerNavMenu: MainFrameMenus['headerNavMenu']
  footerMenu: MainFrameMenus['footerMenu']
  legalLinksMenu: MainFrameMenus['legalLinksMenu']
  promoBarAnnouncements: NonNullable<GlobalSettings['globalSettings']>['promoBarAnnouncements']
  navCollectionImages: CollectionNavImages
  brandLogo: NonNullable<GlobalSettings['globalSettings']>['brandLogo']
  cartBlocksAboveCartItems: NonNullable<
    GlobalSettings['globalSettings']
  >['cartBlocksAboveCartItems']
}
