import { MetaobjectField } from '@shopify/storefront-kit-react/storefront-api-types'

export const flattenMetaobjectFields = (fields: MetaobjectField[]) =>
  fields.reduce((flattenedFields, field) => {
    const { key, value, reference } = field

    return {
      ...flattenedFields,
      [key]: {
        value,
        reference,
      },
    }
  }, {})
