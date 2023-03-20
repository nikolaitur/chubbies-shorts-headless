import type { Location } from '@remix-run/react'
import { Storefront } from '@shopify/hydrogen'
import { ProductOption, ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import { PRODUCT_SIZES } from '~/constants'
import {
  ColorFields,
  ColorOption,
  ColorOptionsByGroup,
  Inseam,
  InseamOption,
  ProductGroupProducts,
  SizeOption,
  PdpProduct,
} from '~/global-types'
import {
  ColorFragment,
  MetaobjectField,
  PpdProductGroupQuery,
  PpdProductGroupQueryVariables,
  PpdProductQuery,
  PpdProductQueryVariables,
} from '~/graphql/generated'
import { PDP_PRODUCT_GROUP_QUERY, PDP_PRODUCT_QUERY } from '~/graphql/storefront/products/queries'
import { flattenMetaobjectFields } from './metaobject'

export const getInseamOptions = (
  inseam: Inseam | null,
  colorId: string | undefined,
  products: ProductGroupProducts | undefined,
): InseamOption[] | null => {
  if (!inseam || !products) return null

  // Go through each products in the product group and find the unique inseam options
  const uniqueInseamOptions = products.reduce((options: Inseam[], product) => {
    const currentInseam = product.inseam?.value
    if (!currentInseam) return options

    const parsedCurrentInseam: Inseam = JSON.parse(currentInseam)
    const isInseamExists = options.some(option => option.value === parsedCurrentInseam.value)

    if (isInseamExists) return options

    return [...options, parsedCurrentInseam]
  }, [])

  // filter products based on selected color
  const productsByColorId = products.filter(product => {
    const currentColorId = product.color?.reference?.id

    if (!currentColorId) return false

    return colorId === currentColorId
  })

  // create a new data shape that will return inseam options with more details
  const inseamOptions = uniqueInseamOptions.reduce((newOptions: InseamOption[], option) => {
    const currentProduct = getProductByInseam(option, productsByColorId)
    const firstProductByInseam = getProductByInseam(option, products)

    const data = {
      ...option,
      exists: Boolean(currentProduct),
      selected: option.value === inseam.value,
      handle: currentProduct?.handle ?? firstProductByInseam?.handle,
    }

    return [...newOptions, data]
  }, [])

  const sortedInseamOptions = inseamOptions.sort((a, z) => {
    return a.value - z.value
  })

  return sortedInseamOptions
}

export const getColorOptions = (
  colorId: string | undefined,
  inseam: Inseam | null,
  products: ProductGroupProducts | undefined,
) => {
  if (!colorId || !inseam || !products) return null

  // Sort products by inseam value, this is for the functionality below:
  // If the user clicks on a color that doesn't exist with current inseam, it will redirect to the next ascending inseam value
  const sortedProducts = products.sort((a, z) => {
    const parsedInseamA = JSON.parse(a.inseam?.value ?? '0')
    const parsedInseamZ = JSON.parse(z.inseam?.value ?? '1')

    return parsedInseamA.value - parsedInseamZ.value
  })

  // Go through each products in the product group and find the unique color options
  const uniqueColorOptions = sortedProducts.reduce(
    (options: Array<ColorFragment & { group: string | null }>, product) => {
      const flattenedColor = product.color?.reference
      const colorGroup = product.colorGroup?.reference?.name?.value

      if (!flattenedColor) return options

      const isColorExists = options.some(option => option.id === flattenedColor.id)

      if (isColorExists) return options

      const data = {
        ...flattenedColor,
        group: colorGroup ?? null,
      }

      return [...options, data]
    },
    [],
  )

  // filter products based on selected inseam
  const productsByInseam = sortedProducts.filter(product => {
    const currentInseam: Inseam | null = JSON.parse(product.inseam?.value ?? 'null')

    if (!currentInseam) return false

    return inseam.value === currentInseam.value
  })

  // create a new data shape that will return inseam options with more details
  const colorOptions = uniqueColorOptions.reduce((newOptions: ColorOption[], option) => {
    const { id, group } = option
    const currentProduct = getProductByColorId(id, productsByInseam)
    const firstProductByColor = getProductByColorId(id, sortedProducts)

    const flattenedColorFields = flattenMetaobjectFields(
      option.fields as MetaobjectField[],
    ) as ColorFields

    const { family, image: colorImage, color: hexColor, storefront_name } = flattenedColorFields
    const { variants, options } = currentProduct ?? {}
    const hasVariantsAndOptions = variants && options

    const flattenedFamilyFields = family.reference?.fields
    const familyValue = flattenedFamilyFields?.find(field => field.key === 'storefront_name')?.value
    const flattenedImage = colorImage.reference?.image

    const data = {
      id,
      name: storefront_name.value,
      exists: Boolean(currentProduct),
      color: hexColor?.value,
      image: flattenedImage,
      family: familyValue,
      group,
      handle: currentProduct?.handle ?? firstProductByColor?.handle,
      selected: colorId === id,
      sizeOptions: hasVariantsAndOptions
        ? getSizeOptions(variants.nodes as ProductVariant[], options)
        : null,
    }

    return [...newOptions, data]
  }, [])

  return colorOptions
}

export const getColorOptionsByGroup = (colorOptions: ColorOption[] | null) => {
  if (!colorOptions) return null

  // get all unique color groups
  const uniqueColorGroups = colorOptions.reduce((groups: string[], option) => {
    const currentGroup = option.group
    if (!currentGroup || groups.includes(currentGroup)) return groups

    return [...groups, currentGroup]
  }, [])

  // create a new data shape that will return color options by group
  const colorOptionsByGroup = uniqueColorGroups.reduce((newGroups: ColorOptionsByGroup, group) => {
    const currentOptionsByGroup = colorOptions.filter(option => option.group === group)

    const data = {
      [group]: currentOptionsByGroup,
    }

    return { ...newGroups, ...data }
  }, {})

  return colorOptionsByGroup
}

export const getSizeOptions = (
  variants: ProductVariant[],
  options: Omit<ProductOption, 'id'>[],
) => {
  // get all available sizes of current product
  const availableSizes = options?.find(option => option.name.toLowerCase() === 'size')?.values

  if (!availableSizes || !variants) return null

  // create a new data shape the will return size options with more details
  const sizeOptions = PRODUCT_SIZES.reduce((options: SizeOption[], size) => {
    const isSizeExist = availableSizes.includes(size)
    const currentVariant = variants.find(variant => {
      const currentVariantSize = variant.selectedOptions.find(
        option => option.name.toLowerCase() === 'size',
      )?.value

      return currentVariantSize === size
    })

    return [
      ...options,
      {
        name: size,
        exists: isSizeExist,
        availableForSale: currentVariant?.availableForSale,
      },
    ]
  }, [])

  return sizeOptions
}

export const getSizeTextDisplay = (size: string) => {
  return size === 'XXXL' ? '3XL' : size
}

export const fetchPdpProductData = async (
  storefront: Storefront,
  variables: Partial<Pick<PpdProductQueryVariables, 'handle' | 'selectedOptions'>>,
) => {
  const { product }: { product: PpdProductQuery['product'] } = await storefront.query(
    PDP_PRODUCT_QUERY,
    {
      variables: {
        country: storefront.i18n.country,
        language: storefront.i18n.language,
        ...variables,
      },
      cache: storefront.CacheCustom({
        sMaxAge: 1,
        staleWhileRevalidate: 59,
        maxAge: 59,
        staleIfError: 600,
      }),
    },
  )

  return product
}

export const fetchProductGroupData = async (
  storefront: Storefront,
  variables: Partial<Pick<PpdProductGroupQueryVariables, 'productGroupId'>>,
) => {
  const { collection }: { collection: PpdProductGroupQuery['collection'] } = await storefront.query(
    PDP_PRODUCT_GROUP_QUERY,
    {
      variables: {
        ...variables,
      },
      cache: storefront.CacheCustom({
        sMaxAge: 1,
        staleWhileRevalidate: 59,
        maxAge: 59,
        staleIfError: 600,
      }),
    },
  )

  return collection
}

export const getDisplayPrices = (
  defaultVariant: ProductVariant,
  selectedVariant: ProductVariant | null,
) => {
  const price = selectedVariant?.price ?? defaultVariant.price
  const compareAtPrice = (() => {
    const newCompareAtPrice = selectedVariant?.compareAtPrice ?? defaultVariant.compareAtPrice

    if (!newCompareAtPrice || !price) return
    if (parseFloat(newCompareAtPrice.amount) <= parseFloat(price.amount)) return

    return newCompareAtPrice
  })()

  return { price, compareAtPrice }
}

export const getProductByInseam = (inseam: Inseam, products: ProductGroupProducts) => {
  return products.find(product => {
    const parsedInseam: Inseam = JSON.parse(product.inseam?.value ?? ' null')

    return parsedInseam?.value === inseam.value
  })
}

export const getProductByColorId = (colorId: string, products: ProductGroupProducts) => {
  return products.find(product => {
    const currentColorId = product.color?.reference?.id

    return currentColorId === colorId
  })
}

export const generateColorState = (state: Location['state'], colorOptions: ColorOption[]) => {
  const selectedColorOption = colorOptions.find(option => option.selected)
  if (state?.firstColor) {
    return state
  } else {
    return { firstColor: selectedColorOption?.id }
  }
}

export const moveInitialColorFirst = (state: Location['state']) => {
  return (a: ColorOption, z: ColorOption) => {
    if (state?.firstColor) {
      if (a.id === state?.firstColor) return -1
      return 1
    } else {
      if (a.selected) return -1
      return 1
    }
  }
}

export const generatePlpAnalytics = (products: any | undefined, collection: any | undefined) => {
  return {
    ecommerce: {
      items: products?.nodes.map((item: any, index: any) => {
        return {
          index: index + 1,
          price: 199,
          item_id: item?.id,
          item_name: item?.display_name?.value,
          item_brand: 'Chubbies',
          item_list_id: collection?.collection?.id,
          item_category: collection?.collection?.title,
          item_list_name: collection?.collection?.handle,
        }
      }),
      currency: 'USD',
    },
  }
}

export const generatePdpAnalytics = (
  product: PdpProduct | undefined,
  collectionTitle: string | undefined,
) => {
  return {
    ecommerce: {
      currency: 'USD',
      items: [
        {
          price: parseFloat(
            product?.selectedVariant
              ? product.selectedVariant.price?.amount
              : product?.variants?.nodes[0]?.price.amount,
          ),
          item_id: product?.id,
          item_name: product?.title,
          item_brand: 'Chubbies',
          item_variant: product?.selectedVariant
            ? product.selectedVariant.id
            : product?.variants.nodes[0].id,
          item_category: collectionTitle,
        },
      ],
    },
  }
}
