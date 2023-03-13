import { CodegenConfig } from '@graphql-codegen/cli'

// const NOSTO_API_APPS_TOKEN = 'op://SoloBrands/HydrogenEnv/Chubbies/NOSTO_API_APPS_TOKEN'

const config: CodegenConfig = {
  overwrite: true,
  pluckConfig: {
    gqlMagicComment: 'gql',
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  generates: {
    'app/graphql/generated/storefront.ts': {
      documents: 'app/graphql/storefront/**/*.ts',
      schema: [
        {
          'https://chubbies.myshopify.com/api/2023-04/graphql.json': {
            headers: {
              'X-Shopify-Storefront-Access-Token': '6beb9ad94eb8033605576c7a2f498cb6',
              'Content-Type': 'application/json,',
            },
          },
        },
      ],
      plugins: ['add', 'typescript', 'typescript-operations'],
      config: {
        content: '/* eslint-disable */',
        skipTypename: true,
        omitOperationSuffix: true,
        mergeFragmentTypes: true,
      },
    },
    // TODO: get the real schema of nosto, currently nosto graphql schema returns error
    // 'app/graphql/generated/nosto.ts': {
    //   documents: 'app/graphql/nosto/**/*.ts',
    //   schema: [
    //     {
    //       'https://api.nosto.com/v1/graphql': {
    //         headers: {
    //           Authorization: `Basic ${encode(`:${NOSTO_API_APPS_TOKEN}`)}`,
    //           'Content-Type': 'application/json,',
    //         },
    //       },
    //     },
    //   ],
    //   plugins: ['add', 'typescript', 'typescript-operations'],
    // },
  },
}

export default config
