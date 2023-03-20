export const METAOBJECT_FIELDS_COMMON_FRAGMENT = /* gql */ `#graphql
  fragment MetaobjectFieldsCommonFragment on MetaobjectField {
    key
    value
  }
`

export const METAOBJECT_FIELDS_REFERENCES_FRAGEMENT = /* gql */ `#graphql
  fragment MetaobjectFieldsReferencesFragment on MetaobjectField {
    references(first: 20) {
      nodes {
        ... on Metaobject {
          fields {
            ...MetaobjectFieldsCommonFragment
            reference {
              ... on Metaobject {
                fields {
                  ...MetaobjectFieldsCommonFragment
                }
              }
            }
          }
        }
      }
    }
  }
`

export const METAOBJECT_FIELDS_REFERENCE_FRAGEMENT = /* gql */ `#graphql
  fragment MetaobjectFieldsReferenceFragment on MetaobjectField {
    reference {
      ... on Metaobject {
        fields {
          ...MetaobjectFieldsCommonFragment
        }
      }
      ... on MediaImage{
        ...MediaImageFragment
      }
    }
  }
`

export const METAOBJECT_FIELDS_FRAGMENT = /* gql */ `#graphql
  ${METAOBJECT_FIELDS_COMMON_FRAGMENT}
  ${METAOBJECT_FIELDS_REFERENCE_FRAGEMENT}
  ${METAOBJECT_FIELDS_REFERENCES_FRAGEMENT}
  fragment MetaobjectFieldsFragment on Metaobject {
    fields {
      ...MetaobjectFieldsCommonFragment
      ...MetaobjectFieldsReferenceFragment
      ...MetaobjectFieldsReferencesFragment
    }
  }
`
