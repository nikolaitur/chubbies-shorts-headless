import { HTMLAttributes } from 'react'

export type CollectionBannerProps = HTMLAttributes<HTMLDivElement> & {
  image: {
    alt: string
    src: string
  }
}
