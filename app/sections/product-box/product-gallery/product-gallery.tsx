import GalleryNav from '@solo-brands/ui-library.ui.shared.gallery-nav'
import clsx from 'clsx'
import { useEffect } from 'react'
import styles from './styles.module.css'
import { ProductGalleryProps } from './types'

const ProductGallery = ({ media, variant = 'slider', ...props }: ProductGalleryProps) => {
  useEffect(() => {
    const thumbnailCarousel = document.querySelector<HTMLDivElement>('.thumbnail-carousel')
    const mainCarousel = document.querySelector<HTMLDivElement>('.main-carousel')

    if (!thumbnailCarousel || !mainCarousel) return

    const handleResize = () => {
      thumbnailCarousel.style.maxHeight = `${mainCarousel.offsetHeight}px`
    }

    /**
     * used ResizeObserver instead of resize event since we also need
     * to get the height of the main carousel after the styles has been flickered
     */
    const resizeObserver = new ResizeObserver(handleResize)

    resizeObserver.observe(mainCarousel)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
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
}

export default ProductGallery
