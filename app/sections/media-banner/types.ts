type MediaItem = {
  image: string | undefined
  linkUrl: string | undefined
  heading: string | undefined
  linkText: string | undefined
}

export type MediaBannerProps = {
  mediaItems: MediaItem[]
}
