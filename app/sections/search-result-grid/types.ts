import { ProductCardQuery } from '~/graphql/generated'

export type SearchResultGridProps = {
  products?: ProductCardQuery['nodes'] | null
}
