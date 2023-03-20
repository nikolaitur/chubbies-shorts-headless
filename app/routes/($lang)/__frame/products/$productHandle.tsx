import { useLoaderData } from '@remix-run/react'
import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import { json, LoaderArgs } from '@shopify/remix-oxygen'
import { ClientOnly } from 'remix-utils'
import { Inseam, LoaderData, PdpProduct } from '~/global-types'
import { SelectedOptionInput } from '~/graphql/generated'
import {
  fetchPdpProductData,
  fetchProductGroupData,
  getColorOptions,
  getColorOptionsByGroup,
  getInseamOptions,
  getSizeOptions,
  generatePdpAnalytics,
} from '~/helpers'
import ProductBox from '~/sections/product-box'

const ProductPage = () => {
  const { product } = (useLoaderData() as LoaderData['product']) ?? {}

  if (!product) return null

  return <ClientOnly>{() => <ProductBox product={product} />}</ClientOnly>
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

  // split queries to prevent throttled requests
  const product = await fetchPdpProductData(storefront, { handle: productHandle, selectedOptions })
  const productGroupId = product?.productGroup?.value
  const productGroup = productGroupId
    ? await fetchProductGroupData(storefront, {
        productGroupId,
      })
    : null

  if (!product) {
    throw json({ message: 'Product does not exist' }, { status: 404, statusText: 'Not Found' })
  }

  const {
    title,
    color,
    inseam,
    options,
    colorGroup,
    productGroup: productBoxProductGroup,
    displayName,
    ...restProduct
  } = product
  const {
    title: collectionTitle,
    description,
    productTitle,
    productGroupDescription,
  } = productBoxProductGroup?.reference ?? {}
  const productsFromProductGroup = productGroup?.products.nodes
  const parsedInseam: Inseam | null = JSON.parse(inseam?.value ?? 'null')
  const colorId = color?.reference?.id
  const inseamOptions = getInseamOptions(parsedInseam, colorId, productsFromProductGroup)
  const colorOptions = getColorOptions(colorId, parsedInseam, productsFromProductGroup)
  const colorOptionsByGroup = getColorOptionsByGroup(colorOptions)
  const sizeOptions = getSizeOptions(product.variants.nodes as ProductVariant[], options)

  // return what is only needed
  const newProduct: PdpProduct = {
    ...restProduct,
    title: displayName?.value ?? title,
    collectionTitle: productTitle?.value ?? collectionTitle,
    description: productGroupDescription?.value ?? description,
    inseamOptions,
    colorOptionsByGroup,
    sizeOptions,
  }

  return json({
    product: newProduct,
    analytics: generatePdpAnalytics(newProduct, collectionTitle),
  }
}
