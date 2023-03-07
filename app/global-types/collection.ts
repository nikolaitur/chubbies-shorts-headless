import { ImageData } from './general'

export interface Product {
  externalId: number
  name: string
  displayName: string
  displayTags: {
    tagMessage: { value: string }
    textHexColor: { value: string }
    bgHexColor: { value: string }
  }[]
  productCardDisplayName: string
  productCardSubtitle: string
  slug: string
  path: string
  minPrice: string
  thumbnail: ImageData
  imageCarousel: ImageData[]
  media: ImageData[]
  hoverMedia: ImageData
  fullBleedHover: boolean
  options: Option[]
  variants: Variant[]
  _highlightResult: {
    productCardDisplayName: { value: string }
    displayName: { value: string }
    name: { value: string }
  }
}

interface Option {
  name: string
  values: []
}

interface Variant {
  variantColor?: { name: string }
  imageCarousel?: ImageData[]
  price: string
  originalPrice?: string
  storefrontId: string
}
