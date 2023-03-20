import { MetaobjectField } from '@shopify/hydrogen/storefront-api-types'
import { FlattenMetaobjectFields } from '~/global-types'

// will be deleted once we migrate all to flattenMetaobjectFieldsV2
export const flattenMetaobjectFields = (fields?: MetaobjectField[]) => {
  if (!fields) return null

  return fields.reduce((flattenedFields, { key, ...field }) => {
    return {
      ...flattenedFields,
      [key]: {
        ...field,
      },
    }
  }, {})
}

// will remove v2 from name once we migrate all v1 to this
export const flattenMetaobjectFieldsV2 = <Fields extends any[], Keys extends string>(
  fields?: Fields,
): FlattenMetaobjectFields<Fields, Keys> | null => {
  if (!fields) return null

  return fields.reduce(
    (flattenedFields, { key, ...field }) => ({
      ...flattenedFields,
      [key]: {
        ...field,
      },
    }),
    {},
  )
}
