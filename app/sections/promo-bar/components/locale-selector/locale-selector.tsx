import Icon, { ChevronDownIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import { forwardRef, Ref } from 'react'
import styles from './styles.module.css'
import { HeaderProps } from './types'

const LocaleSelector = ({ ...props }: HeaderProps, ref: Ref<HTMLDivElement>) => (
  <div className={styles.wrapper} {...props} ref={ref}>
    <span>Canada / CAD</span>
    <Icon as={ChevronDownIcon} />
  </div>
)

export default forwardRef(LocaleSelector)
