import {
  Image,
  Maybe,
  MetafieldReference,
  MetafieldReferenceConnection,
  MetaobjectField,
} from '@shopify/hydrogen/storefront-api-types'
import { Menu, MenuItem } from '@shopify/hydrogen-react/dist/types/storefront-api-types'
import { UnionToIntersection } from 'type-fest'

export type MetafieldReferenceV2 = UnionToIntersection<MetafieldReference>
export type MetafieldReferenceConnectionV2 = UnionToIntersection<MetafieldReferenceConnection>
export type ImageData = Maybe<Image>

export type MetaobjectFieldV2 = Omit<MetaobjectField, 'reference' | 'references'> & {
  reference?: MetafieldReferenceV2
  references?: MetafieldReferenceConnectionV2
}

type EnhancedMenuItem = MenuItem & {
  items: EnhancedMenuItem[]
}

export type EnhancedMenu = Menu & {
  items: EnhancedMenuItem[]
}

export type FooterData = {
  footerMenu: EnhancedMenu
  footerLegalLinks: EnhancedMenu
}
