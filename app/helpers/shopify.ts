import { MetaobjectField } from '@shopify/storefront-kit-react/storefront-api-types'

export const flattenMetaobjectFields = (fields: MetaobjectField[]) =>
  fields.reduce((flattenedFields, { key, ...field }) => {
    return {
      ...flattenedFields,
      [key]: {
        ...field,
      },
    }
  }, {})
