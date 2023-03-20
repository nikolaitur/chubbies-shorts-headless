import { HTMLAttributes } from 'react'

export type CollectionSortByProps = HTMLAttributes<HTMLElement> & {
  sorting: {
    options: SortingOption[]
  }
}

export type SortingOption = {
  field: string
  label: string
  direction: string
}
