import { I18nBase } from '@shopify/hydrogen'
import {
  Cart,
  Image,
  Maybe,
  MetafieldReference,
  MetafieldReferenceConnection,
  MetaobjectField,
} from '@shopify/hydrogen/storefront-api-types'
import { UnionToIntersection } from 'type-fest'
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
}
