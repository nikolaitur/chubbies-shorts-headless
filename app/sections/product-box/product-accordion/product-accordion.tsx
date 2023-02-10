import Accordion, {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@solo-brands/ui-library.ui.atomic.accordion'
import { MetaobjectField } from '~/graphql/generated'
import { flattenMetaobjectFields } from '~/helpers'
import AccordionPanelContent from '../accordion-panel-content'
import styles from './styles.module.css'
import { ProductAccordionFlattenedFields, ProductAccordionProps } from './types'

const ProductAccordion = ({ fields, ...props }: ProductAccordionProps) => {
  const flattenedFields = flattenMetaobjectFields(
    fields as MetaobjectField[],
  ) as ProductAccordionFlattenedFields

  const { display_title, body_text } = flattenedFields

  return (
    <Accordion {...props}>
      <AccordionItem>
        <AccordionButton>{display_title.value}</AccordionButton>
        <AccordionPanel className={styles.panel}>
          <AccordionPanelContent text={body_text.value} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default ProductAccordion
