import { Maybe } from '@shopify/hydrogen/storefront-api-types'
import { PpdProductQuery, ProductGroupFragment } from '~/graphql/generated'
import { ImageData, MetaobjectFieldV2 } from './general'

export type PdpProduct = Omit<
  NonNullable<PpdProductQuery['product']>,
  'inseam' | 'options' | 'color' | 'colorGroup' | 'productGroup' | 'displayName'
> & {
  collectionTitle?: string
  description?: string
  inseamOptions: InseamOption[] | null
  colorOptionsByGroup: { [key: string]: ColorOption[] } | null
  sizeOptions: SizeOption[] | null
}

export type ColorOption = {
  id: string
  name?: Maybe<string>
  exists: boolean
  color?: Maybe<string>
  image?: ImageData
  family?: Maybe<string>
  group: string | null
  handle?: string
  selected: boolean
  sizeOptions: SizeOption[] | null
}

export type ColorFields = {
  family: MetaobjectFieldV2
  image: MetaobjectFieldV2
  storefront_name: MetaobjectFieldV2
  color: MetaobjectFieldV2
}

export type Inseam = {
  value: number
  unit: string
}

export type InseamOption = {
  value: number
  unit: string
  exists?: boolean
  handle?: string
  selected: boolean
}

export type SizeOption = {
  name: string
  exists: boolean
  availableForSale?: boolean
}

export type ProductGroupProducts = ProductGroupFragment['products']['nodes']

export type PdpRouteData = {
  data: {
    product?: PdpProduct
  }
}

export type ColorOptionsByGroup = {
  [key: string]: ColorOption[]
}

export type PpdLoaderData = {
  product: PdpProduct
}
