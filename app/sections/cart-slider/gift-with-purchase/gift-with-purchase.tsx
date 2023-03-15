import { MetaobjectField } from '@shopify/hydrogen/storefront-api-types'
import Accordion, {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@solo-brands/ui-library.ui.atomic.accordion'
import Carousel, { CarouselSlide } from '@solo-brands/ui-library.ui.atomic.carousel'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import { MetaobjectFieldV2 } from '~/global-types'
import { flattenMetaobjectFields } from '~/helpers'
import GiftWithPurchaseCard from '../gift-with-purchase-card'
import styles from './styles.module.css'

export type GiftWithPurchaseProps = HTMLAttributes<HTMLDivElement> & {
  fields: MetaobjectField[]
}

export type GiftWithPurchaseFlattenedFields = {
  block_title?: MetaobjectFieldV2
  internal_name?: MetaobjectFieldV2
  offers?: MetaobjectFieldV2
}

export type SingleProductOfferFlattenedFields = {
  benefit_copy?: MetaobjectFieldV2
  discount_percentage?: MetaobjectFieldV2
  internal_name?: MetaobjectFieldV2
  order_amount_threshold?: MetaobjectFieldV2
  single_gwp_product?: MetaobjectFieldV2
}

const GiftWithPurchase = (
  { fields, ...props }: GiftWithPurchaseProps,
  ref: Ref<HTMLDivElement>,
) => {
  const giftWithPurchaseFlattenedFields = flattenMetaobjectFields(
    fields as MetaobjectField[],
  ) as GiftWithPurchaseFlattenedFields

  const { offers } = giftWithPurchaseFlattenedFields || {}

  const flattenedOffers = offers?.references?.nodes

  return (
    <div className={styles.gwp} ref={ref} {...props}>
      <Accordion horizontalPadding>
        <AccordionItem>
          <AccordionButton className={styles.button}>Claim Your Free Gift</AccordionButton>
          <AccordionPanel className={styles.panel}>
            <Carousel
              slidesLength={flattenedOffers?.length ?? 0}
              options={{
                navigation: {
                  enabled: true,
                },
                navigationSlides: false,
              }}
            >
              {flattenedOffers?.map((data, index) => {
                // @ts-expect-error TODO: update types
                const { fields } = data || {}
                const singleProductOfferFlattenedFields = flattenMetaobjectFields(
                  fields as MetaobjectField[],
                ) as SingleProductOfferFlattenedFields

                return (
                  <CarouselSlide index={0} key={index}>
                    <GiftWithPurchaseCard data={singleProductOfferFlattenedFields} id={data?.id} />
                  </CarouselSlide>
                )
              })}
            </Carousel>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default forwardRef(GiftWithPurchase)
