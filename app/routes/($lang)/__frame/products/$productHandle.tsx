import { useLoaderData } from '@remix-run/react'
import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import { json, LoaderArgs } from '@shopify/remix-oxygen'
import { ClientOnly } from 'remix-utils'
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

  return {
    product: newProduct,
    analytics: {
      ecommerce: {
        currency: 'USD',
        items: [
          {
            price: parseFloat(
              newProduct?.selectedVariant
                ? newProduct.selectedVariant.price?.amount
                : newProduct?.variants?.nodes[0]?.price.amount,
            ),
            item_id: newProduct?.id,
            item_name: newProduct?.title,
            item_brand: 'Chubbies',
            item_variant: newProduct?.selectedVariant
              ? newProduct.selectedVariant.id
              : newProduct?.variants.nodes[0].id,
            item_category: collectionTitle,
          },
        ],
      },
    },
  }
}
