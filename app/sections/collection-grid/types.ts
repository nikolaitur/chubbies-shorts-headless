import { HTMLAttributes } from 'react'
import { ProductCardQuery } from '~/graphql/generated'

export type CollectionGridProps = {
  products?: ProductCardQuery['nodes'] | null
  collection: {
    title: string
    slug: string
    handle: string
    image: {
      alt: string
      src: string
    }
    description: string
    filterGroup: {
      filters: {
        name: string
        filterDisplayText: string
        slug: string
      }
    }
    collectionBannersPosition: number[]
  }
}
