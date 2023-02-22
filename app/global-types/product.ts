import { PdpQuery, ProductGroupFragment } from '~/graphql/generated'
import { ImageData, MetaobjectFieldV2 } from './general'

export type PdpProduct = PdpQuery['product'] & {
  inseamOptions: InseamOption[] | null
  colorOptions: ColorOption[] | null
  colorOptionsByGroup: { [key: string]: ColorOption[] } | null

  sizeOptions: SizeOption[] | null
}

export type ColorOption = {
  name: string
  color?: string
  image?: ImageData
  family: string
  group?: string
  handle: string
  selected: boolean
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
  handle: string
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
    product: PdpProduct
  }
}

export type ColorOptionsByGroup = {
  [key: string]: ColorOption[]
}

export type PpdLoaderData = {
  product: PdpProduct
}
