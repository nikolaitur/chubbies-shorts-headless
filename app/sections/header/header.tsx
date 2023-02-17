import { forwardRef, Ref } from 'react'
import Navigation from '../navigation'
import PromoBar from '../promo-bar'
import styles from './styles.module.css'
import { HeaderProps } from './types'

const Header = ({ ...props }: HeaderProps, ref: Ref<HTMLDivElement>) => (
  <div className={styles.section} {...props} ref={ref}>
    <PromoBar />
    <Navigation />
  </div>
)

export default forwardRef(Header)
