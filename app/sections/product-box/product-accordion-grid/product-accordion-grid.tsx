import Accordion, {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@solo-brands/ui-library.ui.atomic.accordion'
import { MetaobjectField } from '~/graphql/generated'
import { flattenMetaobjectFields } from '~/helpers'
import AccordionPanelContent from '../accordion-panel-content'
import styles from './styles.module.css'
import {
  CardFlattenedFields,
  ProductAccordionGridFlattenedFields,
  ProductAccordionGridProps,
} from './types'

const ProductAccordionGrid = ({ fields, ...props }: ProductAccordionGridProps) => {
  const flattenedFields = flattenMetaobjectFields(
    fields as MetaobjectField[],
  ) as ProductAccordionGridFlattenedFields

  const { title, cards } = flattenedFields
  const flattenedCards = cards.references?.nodes

  return (
    <Accordion {...props}>
      <AccordionItem>
        <AccordionButton>{title.value}</AccordionButton>
        <AccordionPanel className={styles.panel}>
          {flattenedCards?.map((card, index) => {
            const flattenedCardFields = flattenMetaobjectFields(
              // @ts-expect-error - TODO: update codegen config
              card.fields as MetaobjectField[],
            ) as CardFlattenedFields

            const { image, text } = flattenedCardFields
            const iconData = image.reference?.image

            return <AccordionPanelContent key={index} icon={iconData} text={text.value} />
          })}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default ProductAccordionGrid
