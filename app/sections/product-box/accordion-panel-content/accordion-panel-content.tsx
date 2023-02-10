import { Image } from '@shopify/hydrogen'
import clsx from 'clsx'
import RichText from '~/components/rich-text'
import styles from './styles.module.css'
import { AccordionPanelContentProps } from './types'

const AccordionPanelContent = ({ icon, image, text, ...props }: AccordionPanelContentProps) => {
  const imageData = icon ?? image

  return (
    <div className={clsx(styles.panel, { [styles.withIcon]: Boolean(icon) })} {...props}>
      {imageData && (
        <div className={styles.imageWrapper}>
          <Image className={styles.image} data={imageData} />
        </div>
      )}
      <div className={styles.textWrapper}>
        <RichText source={text} />
      </div>
    </div>
  )
}

export default AccordionPanelContent
