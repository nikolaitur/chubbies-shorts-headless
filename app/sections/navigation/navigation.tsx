import clsx from 'clsx'
import { forwardRef, Ref } from 'react'
import DesktopNav from './components/desktop-nav'
import MobileNav from './components/mobile-nav'
import styles from './styles.module.css'
import { HeaderProps } from './types'

// TODO: LIVE DATA INTEGRATION
const mockData = []

const Navigation = ({ ...props }: HeaderProps, ref: Ref<HTMLDivElement>) => {
  return (
    <div className={clsx(styles.wrapper)} ref={ref}>
      <MobileNav />
      <DesktopNav />
    </div>
  )
}

export default forwardRef(Navigation)
