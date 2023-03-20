import { HTMLAttributes } from 'react'
import { Facets } from '~/global-types'

export type CollectionFiltersProps = HTMLAttributes<HTMLElement> & {
  facets?: Facets
}
