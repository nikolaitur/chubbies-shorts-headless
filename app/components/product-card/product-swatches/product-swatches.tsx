import VariantSelector from '@solo-brands/ui-library.ui.atomic.variant-selector'
import { ColorOption, Inseam, InseamOption } from '~/global-types'
import { ProductCardFragment } from '~/graphql/generated'
import { getColorOptions, getInseamOptions } from '~/helpers'
import ColorVariantsCarousel from '../color-variants-carousel'
import styles from './styles.module.css'
import { ProductSwatchesProps } from './types'

const ProductSwatches = ({ productGroups, product, onSwatchUpdate }: ProductSwatchesProps) => {
  const productGroupId = product?.productGroup?.value

  const productGroup = productGroups.find((productGroup: any) => productGroup.id === productGroupId)

  const { inseam, color } = product ?? {}
  const productsFromProductGroup = productGroup?.products.nodes
  const parsedInseam: Inseam | null = JSON.parse(inseam?.value ?? 'null')
  const colorId = color?.reference?.id
  const inseamOptions = getInseamOptions(parsedInseam, colorId, productsFromProductGroup) ?? []
  const colorOptions = getColorOptions(colorId, parsedInseam, productsFromProductGroup) ?? []
  const changeInseamOption = (inseam: InseamOption) => {
    const product = productGroup?.products?.nodes.find(product => product.handle === inseam?.handle)
    onSwatchUpdate(product as ProductCardFragment)
  }

  const changeColorOption = (colorOption: ColorOption) => {
    const { handle } = colorOption || {}
    const product = productGroup?.products?.nodes.find(product => product.handle === handle)
    onSwatchUpdate(product as ProductCardFragment)
  }

  return (
    <div className={styles.productSwatches}>
      <div className={styles.colorSwatches}>
        <ColorVariantsCarousel
          colorOptions={colorOptions}
          onChangeColorOption={changeColorOption}
          variant="slider"
          size="sm"
        />
      </div>
      <div className={styles.inseamVariants}>
        {inseamOptions?.map(inseam => {
          const { value, selected, handle, exists } = inseam || {}
          return (
            <VariantSelector
              selected={selected}
              key={`${handle}-inseam`}
              option={`${value}"`}
              onClick={() => changeInseamOption(inseam)}
              disabled={!exists}
              unavailable={!exists}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ProductSwatches
