import Accordion, {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@solo-brands/ui-library.ui.atomic.accordion'
import Carousel, { CarouselSlide } from '@solo-brands/ui-library.ui.atomic.carousel'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import GiftWithPurchaseCard from '../gift-with-purchase-card'
import styles from './styles.module.css'

export type GiftWithPurchaseProps = HTMLAttributes<HTMLDivElement>

const GiftWithPurchase = ({ ...props }: GiftWithPurchaseProps, ref: Ref<HTMLDivElement>) => {
  // Test data
  const slides = [
    {
      id: 1,
      sizes: true,
      selected: false,
      disabled: false,
    },
    {
      id: 2,
      sizes: false,
      selected: true,
      disabled: false,
    },
    {
      id: 3,
      sizes: false,
      selected: false,
      disabled: true,
    },
  ]

  return (
    <div className={styles.gwp} ref={ref} {...props}>
      <Accordion horizontalPadding>
        <AccordionItem>
          <AccordionButton className={styles.button}>Claim Your Free Gift</AccordionButton>
          <AccordionPanel className={styles.panel}>
            <Carousel
              slidesLength={slides.length}
              options={{
                navigation: {
                  enabled: true,
                },
              }}
            >
              {slides?.map((slide, index) => (
                <CarouselSlide key={slide?.id} index={index}>
                  <GiftWithPurchaseCard
                    selected={slide.selected}
                    disabled={slide.disabled}
                    sizes={slide.sizes}
                  />
                </CarouselSlide>
              ))}
            </Carousel>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default forwardRef(GiftWithPurchase)
