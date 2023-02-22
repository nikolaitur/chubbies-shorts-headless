import { useLoaderData, useSearchParams } from '@remix-run/react'
import { json, LoaderArgs } from '@shopify/remix-oxygen'
import { useEffect } from 'react'
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
  const { selectedVariant } = product
  const [searchParams, setSearchParams] = useSearchParams()

  // set search params for selected variant if it's not yet being set
  // this will only trigger once per visit of product page
  useEffect(() => {
    if (!selectedVariant) return

    const selectedVariantSearchParamsString = selectedVariant.selectedOptions.reduce(
      (params, option, index) => {
        return `${params}${index > 0 ? '&' : ''}${option.name}=${option.value}`
      },
      '',
    )

    const selectedVariantSearchParams = new URLSearchParams(selectedVariantSearchParamsString)

    const isVariantExistsInSearchParams = searchParams
      .toString()
      .includes(selectedVariantSearchParams.toString())

    if (!isVariantExistsInSearchParams) setSearchParams(selectedVariantSearchParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant, searchParams])

  return (
    <>
      <ProductBox product={product} />
    </>
  )
}

export default ProductPage

export async function loader({ params, request, context: { storefront } }: LoaderArgs) {
  const { handle } = params

  const searchParams = new URL(request.url).searchParams

  // set selectedOptions args based on current search parameters
  const selectedOptions: SelectedOptionInput[] = []
  searchParams.forEach((value, name) => {
    selectedOptions.push({ name, value })
  })

  const { product } = (await storefront.query(PDP_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
    cache: storefront.CacheShort(),
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
  const firstVariant = product.variants.nodes[0]
  const newSelectedVariant = product.selectedVariant ?? firstVariant

  const newProduct: PdpProduct = {
    ...product,
    inseamOptions,
    colorOptions,
    colorOptionsByGroup,
    sizeOptions,
    selectedVariant: newSelectedVariant,
  }

  return { product: newProduct }
}
