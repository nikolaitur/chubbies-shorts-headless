import GalleryNav from '@solo-brands/ui-library.ui.shared.gallery-nav'
import clsx from 'clsx'
import { BREAKPOINTS } from '~/constants'
import { useMatchMedia } from '~/hooks'
import styles from './styles.module.css'
import { ProductGalleryProps } from './types'

const ProductGallery = ({ media, variant = 'slider', ...props }: ProductGalleryProps) => {
  const isBreakpointMD = useMatchMedia(BREAKPOINTS.MD)

  return (
    <div className={clsx(styles.wrapper, styles[variant])} {...props}>
      <GalleryNav
        className={clsx(styles.thumbnailCarousel, 'thumbnail-carousel')}
        mediaFiles={media}
        aspectRatio="3:4"
        variant="vertical"
        options={{ syncWith: '.main-carousel' }}
        size="sm"
      />
      <GalleryNav
        className={clsx(styles.mainCarousel, 'main-carousel')}
        mediaFiles={media}
        aspectRatio="3:4"
        options={{
          itemsPerSlide: 1,
          withArrows: false,
          withEndScroll: false,
          withDots: !isBreakpointMD,
          syncWith: '.thumbnail-carousel',
        }}
        size="fluid"
        withBorder={false}
      />
    </div>
  )
}

export default ProductGallery
