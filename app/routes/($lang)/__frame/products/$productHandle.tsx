import { useLoaderData } from '@remix-run/react'
import { json, LoaderArgs } from '@shopify/remix-oxygen'
import { STOREFRONT_NAME_KEY } from '~/constants'
import { Inseam, PdpProduct, PpdLoaderData } from '~/global-types'
import { PdpQuery, SelectedOptionInput } from '~/graphql/generated'
import { PDP_QUERY } from '~/graphql/storefront/products/queries'
import {
  getColorOptions,
  getColorOptionsByGroup,
  getInseamOptions,
  getSizeOptions,
} from '~/helpers'
import ProductBox from '~/sections/product-box'

const ProductPage = () => {
  const { product } = useLoaderData() as PpdLoaderData

  return (
    <>
      <ProductBox product={product} />
    </>
  )
}

export default ProductPage

export async function loader({ params, request, context: { storefront } }: LoaderArgs) {
  const { productHandle } = params

  const searchParams = new URL(request.url).searchParams

  // set selectedOptions args based on current search parameters
  const selectedOptions: SelectedOptionInput[] = []
  searchParams.forEach((value, name) => {
    selectedOptions.push({ name, value })
  })

  const { product } = (await storefront.query(PDP_QUERY, {
    variables: {
      country: storefront.i18n.country,
      language: storefront.i18n.language,
      handle: productHandle,
      selectedOptions,
    },
    cache: storefront.CacheCustom({
      sMaxAge: 1,
      staleWhileRevalidate: 59,
      maxAge: 59,
      staleIfError: 600,
    }),
  })) as PdpQuery

  if (!product) {
    throw json({ message: 'Product does not exist' }, { status: 404, statusText: 'Not Found' })
  }

  const productsFromProductGroup = product.productGroup?.reference?.products.nodes
  const parsedInseam: Inseam | null = JSON.parse(product.inseam?.value ?? 'null')
  const colorName = product.color?.reference?.fields.find(
    field => field.key === STOREFRONT_NAME_KEY,
  )?.value
  const inseamOptions = getInseamOptions(parsedInseam, productsFromProductGroup)
  const colorOptions = getColorOptions(colorName, parsedInseam, productsFromProductGroup)
  const colorOptionsByGroup = getColorOptionsByGroup(colorOptions)
  const sizeOptions = getSizeOptions(product)

  const newProduct: PdpProduct = {
    ...product,
    inseamOptions,
    colorOptions,
    colorOptionsByGroup,
    sizeOptions,
  }

  return { product: newProduct }
}
