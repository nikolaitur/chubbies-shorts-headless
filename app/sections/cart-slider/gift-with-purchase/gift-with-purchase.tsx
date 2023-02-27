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
  return (
    <div className={styles.gwp} ref={ref} {...props}>
      <Accordion horizontalPadding>
        <AccordionItem>
          <AccordionButton className={styles.button}>Claim Your Free Gift</AccordionButton>
          <AccordionPanel className={styles.panel}>
            <Carousel
              slidesLength={0}
              options={{
                navigation: {
                  enabled: true,
                },
              }}
            >
              <CarouselSlide index={0}>
                <GiftWithPurchaseCard />
              </CarouselSlide>
            </Carousel>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default forwardRef(GiftWithPurchase)
