import { HTMLAttributes } from 'react'
import { InfoBlockFragment } from '~/graphql/generated'

export type ProductInfoBlocksProps = HTMLAttributes<HTMLDivElement> & {
  infoBlocks: InfoBlockFragment[]
}

export type InfoBlockProps = HTMLAttributes<HTMLDivElement> & InfoBlockFragment
