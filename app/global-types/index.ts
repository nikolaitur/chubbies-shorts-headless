import {
  CountryCode,
  CurrencyCode,
  Image,
  LanguageCode,
  Maybe,
  MetafieldReference,
  MetafieldReferenceConnection,
  MetaobjectField,
} from '@shopify/hydrogen/storefront-api-types'
import { UnionToIntersection } from 'type-fest'

export type Locale = {
  language: LanguageCode
  country: CountryCode
  label: string
  currency: CurrencyCode
}

export type Localizations = Record<string, Locale>

export type I18nLocale = Locale & {
  pathPrefix: string
}

export type MetafieldReferenceV2 = UnionToIntersection<MetafieldReference>
export type MetafieldReferenceConnectionV2 = UnionToIntersection<MetafieldReferenceConnection>
export type ImageData = Maybe<Image>

export type MetaobjectFieldV2 = Omit<MetaobjectField, 'reference' | 'references'> & {
  reference?: MetafieldReferenceV2
  references?: MetafieldReferenceConnectionV2
}
