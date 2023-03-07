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

  const { display_title, body_text, closed_on_page_load } = flattenedFields
  const isExpandedByDefault = !JSON.parse(closed_on_page_load?.value ?? 'false')

  return (
    <Accordion {...props}>
      <AccordionItem isExpandedDefault={isExpandedByDefault}>
        <AccordionButton>{display_title?.value}</AccordionButton>
        <AccordionPanel className={styles.panel}>
          <AccordionPanelContent text={body_text?.value} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default ProductAccordion
