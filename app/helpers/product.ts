import { Storefront } from '@shopify/hydrogen'
import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import { PRODUCT_SIZES } from '~/constants'
import {
  ColorFields,
  ColorOption,
  ColorOptionsByGroup,
  Inseam,
  InseamOption,
  ProductGroupProducts,
  SizeOption,
} from '~/global-types'
import {
  MetaobjectField,
  PpdProductGroupQuery,
  PpdProductGroupQueryVariables,
  PpdProductQuery,
  PpdProductQueryVariables,
} from '~/graphql/generated'
import { PDP_PRODUCT_GROUP_QUERY, PDP_PRODUCT_QUERY } from '~/graphql/storefront/products/queries'
import { flattenMetaobjectFields } from './shopify'

export const getInseamOptions = (
  inseam: Inseam | null,
  colorId: string | undefined,
  products: ProductGroupProducts | undefined,
): InseamOption[] | null => {
  if (!inseam || !products) return null

  // filter products based on selected color
  const productsByColorId = products.filter(product => {
    const currentColorId = product.color?.reference?.id

    if (!currentColorId) return false

    return colorId === currentColorId
  })

  // Go through each products in the product group and find the unique inseams
  const uniqueInseamOptions = productsByColorId.reduce((options: InseamOption[], product) => {
    const currentInseam = product.inseam?.value

    if (!currentInseam) return options

    const parsedCurrentInseam: Inseam = JSON.parse(currentInseam)
    const isInseamExists = options.some(option => option.value === parsedCurrentInseam.value)

    if (isInseamExists) return options

    const data: InseamOption = {
      ...parsedCurrentInseam,
      selected: parsedCurrentInseam.value === inseam.value,
      handle: product.handle,
    }

    return [...options, data]
  }, [])

  const sortedInseamOptions = uniqueInseamOptions.sort((a, z) => {
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

  // filter products based on selected inseam
  const productsByInseam = products.filter(product => {
    const currentInseam: Inseam | null = JSON.parse(product.inseam?.value ?? 'null')

    if (!currentInseam) return false

    return inseam.value === currentInseam.value
  })

  // Go through each products by current inseam in the product group and find the unique colors
  const uniqueColorOptions = productsByInseam.reduce((options: any[], product) => {
    const currentColor = product.color?.reference

    if (!currentColor) return options

    const flattenedColorFields = flattenMetaobjectFields(
      currentColor.fields as MetaobjectField[],
    ) as ColorFields

    const { family, image: colorImage, color: hexColor, storefront_name } = flattenedColorFields
    const currentColorName = storefront_name.value

    const isColorExists = options.some(option => option.name === currentColorName)

    if (isColorExists) return options

    const currentColorId = currentColor.id
    const flattenedFamilyFields = family.reference?.fields
    const familyValue = flattenedFamilyFields?.find(field => field.key === 'storefront_name')?.value
    const flattenedImage = colorImage.reference?.image
    const colorGroup = product.colorGroup?.reference?.name?.value ?? null

    const data = {
      id: currentColorId,
      name: currentColorName,
      color: hexColor?.value,
      image: flattenedImage,
      family: familyValue,
      group: colorGroup,
      handle: product.handle,
      selected: colorId === currentColorId,
    }

    return [...options, data]
  }, [])

  return uniqueColorOptions
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

export const getSizeOptions = (product: PpdProductQuery['product']) => {
  const { variants, options } = product ?? {}
  // get all available sizes of current product
  const availableSizes = options?.find(option => option.name.toLowerCase() === 'size')?.values

  if (!availableSizes || !variants) return null

  // create a new data shape the will return size options with more details
  const sizeOptions = PRODUCT_SIZES.reduce((options: SizeOption[], size) => {
    const isSizeExist = availableSizes.includes(size)
    const currentVariant = variants.nodes.find(variant => {
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
): Promise<PpdProductQuery['product']> => {
  const { product } = (await storefront.query(PDP_PRODUCT_QUERY, {
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
  })) as PpdProductQuery

  return product
}

export const fetchProductGroupData = async (
  storefront: Storefront,
  variables: Partial<Pick<PpdProductGroupQueryVariables, 'productGroupId'>>,
): Promise<PpdProductGroupQuery['collection']> => {
  const { collection } = (await storefront.query(PDP_PRODUCT_GROUP_QUERY, {
    variables: {
      ...variables,
    },
    cache: storefront.CacheCustom({
      sMaxAge: 1,
      staleWhileRevalidate: 59,
      maxAge: 59,
      staleIfError: 600,
    }),
  })) as PpdProductGroupQuery

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
