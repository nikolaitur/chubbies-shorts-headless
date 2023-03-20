import { Link } from '@remix-run/react'
import { ProductVariant } from '@shopify/hydrogen/storefront-api-types'
import { Image } from '@shopify/storefront-kit-react'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import { CloseIcon, HeartIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import Price from '@solo-brands/ui-library.ui.atomic.price'
import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import clsx from 'clsx'
import { Suspense, useEffect, useState } from 'react'
import { Await } from 'react-router'
import AtcButton from '~/components/atc-button'
import { SizeOption } from '~/global-types'
import { ProductCardFragment, ProductGroupVariantsFragment } from '~/graphql/generated'
import ProductSwatches from './product-swatches'
import styles from './styles.module.css'
import { ProductCardProps } from './types'

const ProductCard = ({ product, productGroups }: ProductCardProps) => {
  const [isQuickShopOpen, setIsQuickShopOpen] = useState(false)
  // GET PRODUCT FROM PRODUCT GROUP
  const [selectedProduct, setSelectedProduct] = useState<ProductCardFragment>(product)
  const [sizeVariants, setSizeVariants] = useState<ProductCardFragment['variants']['nodes']>([])
  const [selectedVariant, setSelectedVariant] = useState<ProductGroupVariantsFragment>()

  useEffect(() => {
    setSizeVariants(selectedProduct?.variants?.nodes ?? [])
    setSelectedVariant(selectedProduct?.variants?.nodes?.[0] ?? {})
    setIsQuickShopOpen(false)
  }, [selectedProduct])

  const getProductSizeOptionValue = (options: Array<SizeOption>) => {
    const sizeOption = options.find(option => option?.name === 'Size')
    return sizeOption?.value
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link to={`/products/${selectedProduct?.handle}`}>
          <Image className={styles.image} data={selectedProduct?.images?.nodes?.[0] || {}} />
          {/* TODO: Add Hover Image, need metafield to wire data */}
          <Image className={styles.hoverImage} data={selectedProduct?.images?.nodes?.[1] || {}} />
        </Link>
        {/* <TagList tags={tags} /> */}
        <div className={styles.favorite}>
          <ButtonIcon
            variant="tertiary"
            size="sm"
            border="rounded"
            icon={<HeartIcon fill="#000000" />}
          />
        </div>
        <div className={clsx(styles.quickShop, { [styles.active]: isQuickShopOpen })}>
          <Button
            className={styles.quickButton}
            onClick={() => setIsQuickShopOpen(true)}
            variant="primary"
          >
            Quick Shop
          </Button>
          <div className={styles.quickCart}>
            <ButtonIcon
              className={styles.quickClose}
              variant="minimal"
              size="sm"
              border="box"
              onClick={() => setIsQuickShopOpen(false)}
              icon={<CloseIcon />}
            />
            <div className={styles.quickCartVariants}>
              <span>Variants</span>
              <div className={styles.quickCartVariantSelector}>
                {sizeVariants.map(variant => {
                  return (
                    <VariantSelector
                      key={variant.id}
                      selected={selectedVariant === variant}
                      size="md"
                      option={getProductSizeOptionValue(variant?.selectedOptions ?? []) || ''}
                      onClick={() => setSelectedVariant(variant)}
                    />
                  )
                })}
              </div>
            </div>
            {selectedVariant && (
              <AtcButton
                withPrice={undefined}
                selectedSize={'True'}
                defaultVariant={selectedVariant as ProductVariant}
                selectedVariant={selectedVariant as ProductVariant}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.productDescription}>
        <Link to={`/products/${selectedProduct?.handle}`}>
          <h1 className={styles.title}>{selectedProduct?.title}</h1>
        </Link>
        <Price
          amount={selectedVariant?.price?.amount || '0.00'}
          currencyCode={selectedVariant?.price?.currencyCode || 'USD'}
        />
      </div>
      <div className={styles.cardSwatches}>
        {productGroups && (
          <Suspense fallback={<></>}>
            <Await resolve={productGroups}>
              {productGroups => (
                <ProductSwatches
                  onSwatchUpdate={setSelectedProduct}
                  productGroups={productGroups}
                  product={selectedProduct}
                />
              )}
            </Await>
          </Suspense>
        )}
      </div>
      {/* <ProductCardMessage tags={tags} /> */}
    </div>
  )
}

export default ProductCard
