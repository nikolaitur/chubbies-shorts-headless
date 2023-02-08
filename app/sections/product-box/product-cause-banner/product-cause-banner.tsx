import { Link } from '@remix-run/react'
import { Image } from '@shopify/hydrogen'
import { CSSProperties } from 'react'
import { MetaobjectField } from '~/graphql/generated'
import { flattenMetaobjectFields } from '~/helpers/shopify'
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
        <Link className={styles.learnMoreButton} to={cta_link.value}>
          {cta_text.value}
        </Link>
      </div>
      <div>
        {/* TODO: create richtext component for this */}
        <p className={styles.title}>Every order counts</p>
        <p className={styles.description}>
          Your purchase of this product supports Foundation 43’s mission to expand access to mental
          health care and suicide prevention in the United States.
        </p>
      </div>
      {bgImageData && <Image className={styles.bgImage} data={bgImageData} />}
    </div>
  )
}

export default ProductCauseBanner
