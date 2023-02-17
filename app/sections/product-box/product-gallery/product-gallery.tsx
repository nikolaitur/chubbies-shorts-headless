import GalleryNav from '@solo-brands/ui-library.ui.shared.gallery-nav'
import clsx from 'clsx'
import styles from './styles.module.css'
import { ProductGalleryProps } from './types'

const ProductGallery = ({ media, variant = 'slider', ...props }: ProductGalleryProps) => (
  <div className={clsx(styles.wrapper, styles[variant])} {...props}>
    <GalleryNav
      className={clsx(styles.thumbnailCarousel, 'thumbnail-carousel')}
      mediaFiles={media}
      aspectRatio="3:4"
      options={{ direction: 'vertical', syncWith: '.main-carousel' }}
      size="sm"
    />
    <GalleryNav
      className={clsx(styles.mainCarousel, 'main-carousel')}
      mediaFiles={media}
      aspectRatio="3:4"
      options={{
        slidesPerView: 1,
        navigation: {
          enabled: false,
        },
        syncWith: '.thumbnail-carousel',
      }}
      size="fluid"
      withBorder={false}
    />
  </div>
)

export default ProductGallery
