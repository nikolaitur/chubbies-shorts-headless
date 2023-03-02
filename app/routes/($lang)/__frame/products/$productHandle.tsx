import { useLoaderData } from '@remix-run/react'
import { json, LoaderArgs } from '@shopify/remix-oxygen'
import { Inseam, PdpProduct, PpdLoaderData } from '~/global-types'
import { SelectedOptionInput } from '~/graphql/generated'
import {
  fetchPdpProductData,
  fetchProductGroupData,
  getColorOptions,
  getColorOptionsByGroup,
  getInseamOptions,
  getSizeOptions,
} from '~/helpers'
import ProductBox from '~/sections/product-box'
import { ClientOnly } from 'remix-utils'

const ProductPage = () => {
  const { product } = useLoaderData() as PpdLoaderData

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
  const productGroup = await fetchProductGroupData(storefront, {
    productGroupId: product?.productGroup?.value,
  })

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
  const { title: collectionTitle, description } = productBoxProductGroup?.reference ?? {}
  const productsFromProductGroup = productGroup?.products.nodes
  const parsedInseam: Inseam | null = JSON.parse(inseam?.value ?? 'null')
  const colorId = color?.reference?.id
  const inseamOptions = getInseamOptions(parsedInseam, colorId, productsFromProductGroup)
  const colorOptions = getColorOptions(colorId, parsedInseam, productsFromProductGroup)
  const colorOptionsByGroup = getColorOptionsByGroup(colorOptions)
  const sizeOptions = getSizeOptions(product)

  // return what is only needed
  const newProduct: PdpProduct = {
    ...restProduct,
    title: displayName?.value ?? title,
    collectionTitle,
    description,
    inseamOptions,
    colorOptionsByGroup,
    sizeOptions,
  }

  return { product: newProduct }
}
