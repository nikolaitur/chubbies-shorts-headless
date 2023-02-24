import { useLoaderData } from '@remix-run/react'
import { json, LoaderArgs } from '@shopify/remix-oxygen'
import { Inseam, PdpProduct, PpdLoaderData } from '~/global-types'
import { SelectedOptionInput } from '~/graphql/generated'
import {
  fetchPdpProductData,
  fetchPdpProductGroupData,
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

  // split queries to prevent throttled requests
  const [product, productGroup] = await Promise.all([
    await fetchPdpProductData(storefront, { handle: productHandle, selectedOptions }),
    await fetchPdpProductGroupData(storefront, { handle: productHandle }),
  ])

  if (!product) {
    throw json({ message: 'Product does not exist' }, { status: 404, statusText: 'Not Found' })
  }

  const { handle, infoBlocks, media, selectedVariant, variants, inseam, color } = product
  const productsFromProductGroup = productGroup?.reference?.products.nodes
  const parsedInseam: Inseam | null = JSON.parse(inseam?.value ?? 'null')
  const colorId = color?.reference?.id
  const inseamOptions = getInseamOptions(parsedInseam, colorId, productsFromProductGroup)
  const colorOptions = getColorOptions(colorId, parsedInseam, productsFromProductGroup)
  const colorOptionsByGroup = getColorOptionsByGroup(colorOptions)
  const sizeOptions = getSizeOptions(product)

  // return what is only needed
  const newProduct: PdpProduct = {
    handle,
    media,
    infoBlocks,
    variants,
    selectedVariant,
    inseamOptions,
    colorOptionsByGroup,
    sizeOptions,
  }

  return { product: newProduct }
}
