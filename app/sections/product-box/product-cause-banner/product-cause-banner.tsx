import { Image } from '@shopify/hydrogen'
import { CSSProperties } from 'react'
import Link from '~/components/link'
import RichText from '~/components/rich-text'
import { MetaobjectField } from '~/graphql/generated'
import { flattenMetaobjectFields } from '~/helpers'
import styles from './styles.module.css'
import { ProductCauseBannerFlattenedFields, ProductCauseBannerProps } from './types'

const ProductCauseBanner = ({ fields, ...props }: ProductCauseBannerProps) => {
  const flattenedFields = flattenMetaobjectFields(
    fields as MetaobjectField[],
  ) as ProductCauseBannerFlattenedFields
  const { background_image, background_opacity, body_text, cause_logo, cta_link, cta_text } =
    flattenedFields
  const logoData = cause_logo.reference?.image
  const bgImageData = background_image.reference?.image

  return (
    <div
      className={styles.wrapper}
      style={{ '--background-opacity': background_opacity.value } as CSSProperties}
      {...props}
    >
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          {logoData && <Image className={styles.logo} data={logoData} />}
        </div>
        <Link className={styles.learnMoreButton} to={cta_link.value ?? ''}>
          {cta_text.value}
        </Link>
      </div>
      <div>
        <RichText source={body_text.value} />
      </div>
      {bgImageData && <Image className={styles.bgImage} data={bgImageData} />}
    </div>
  )
}

export default ProductCauseBanner
