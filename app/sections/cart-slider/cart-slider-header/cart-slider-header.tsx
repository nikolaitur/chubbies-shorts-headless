import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import { CloseIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import { forwardRef, HTMLAttributes, Ref } from 'react'

import styles from './styles.module.css'

export type CartSliderHeaderProps = HTMLAttributes<HTMLDivElement> & {
  onCartClose: () => void
  title?: string
}

const CartSliderHeader = (
  { onCartClose, title = 'Your Cart', ...props }: CartSliderHeaderProps,
  ref: Ref<HTMLDivElement>,
) => (
  <div className={styles.cartSliderHeader} ref={ref} {...props}>
    <div className={styles.title}>{title}</div>
    <ButtonIcon
      className={styles.button}
      icon={<CloseIcon />}
      size="sm"
      variant="minimal"
      onClick={onCartClose}
    />
  </div>
)

export default forwardRef(CartSliderHeader)
