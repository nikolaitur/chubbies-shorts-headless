import { MetaobjectField } from '@shopify/hydrogen/storefront-api-types'
import NostoRecommendedProducts from '~/components/nosto-recommended-products'
import { flattenMetaobjectFields } from '~/helpers'
import styles from './styles.module.css'
import { ProductBoxNostoFlattenedFields, ProductBoxNostoProps } from './types'

const ProductBoxNosto = ({ fields, ...props }: ProductBoxNostoProps) => {
  const flattenedFields = flattenMetaobjectFields(
    fields as MetaobjectField[],
  ) as ProductBoxNostoFlattenedFields

  const { nosto_placement_id, section_title } = flattenedFields
  const nostoId = nosto_placement_id?.value

  return (
    <div {...props}>
      <p className={styles.title}>{section_title?.value}</p>
      {nostoId && <NostoRecommendedProducts className={styles.nosto} nostoId={nostoId} size="xs" />}
    </div>
  )
}

export default ProductBoxNosto
