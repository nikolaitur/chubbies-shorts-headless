type Size = 'xl' | 'lg' | 'md' | 'sm' | 'xs'

export type ColorVariantsCarouselProps = {
  colors: any[] // type not yet known
  size?: Size
  variant?: 'inline' | 'slider'
}

export type ColorVariantsCarouselInnerProps = {
  colors: any[] // type not yet known
  size?: Size
}
