import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import { ChevronLeftIcon, CloseIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import cx from 'clsx'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import styles from './styles.module.css'

export type CartSliderHeaderProps = HTMLAttributes<HTMLDivElement> & {
  onCartClose: () => void
  onEditClose: () => void
}

const CartSliderHeader = (
  { onCartClose, onEditClose, ...props }: CartSliderHeaderProps,
  ref: Ref<HTMLDivElement>,
) => (
  <div className={styles.cartSliderHeader} ref={ref} {...props}>
    {/* TO-DO: Edit line item logic */}
    <ButtonIcon
      icon={<ChevronLeftIcon />}
      size="sm"
      variant="minimal"
      onClick={onEditClose}
      className={cx(styles.editButton, { [styles.isEditEnabled]: true })}
    />
    <div className={styles.title}>Your Cart</div>
    <ButtonIcon icon={<CloseIcon />} size="sm" variant="minimal" onClick={onCartClose} />
  </div>
)

export default forwardRef(CartSliderHeader)
