import { HTMLAttributes } from 'react'
import { UnionToIntersection } from 'type-fest'
import { PdpMediaFragment } from '~/graphql/generated'

export type ProductGalleryProps = HTMLAttributes<HTMLDivElement> & {
  media: UnionToIntersection<PdpMediaFragment>[]
  variant?: 'slider' | 'grid'
}
