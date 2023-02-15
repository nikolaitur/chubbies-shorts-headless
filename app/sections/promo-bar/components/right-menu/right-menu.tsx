import { Link } from '@remix-run/react'
import { forwardRef, Ref } from 'react'
import LocaleSelector from '../locale-selector'
import styles from './styles.module.css'
import { HeaderProps } from './types'

const mockData = [
  {
    to: '/rewards',
    title: 'Rewards 🌟',
    children: 'Rewards 🌟',
  },
  {
    to: '/size-guides',
    title: 'Size Guides',
    children: 'Size Guides',
  },
  {
    to: '/help',
    title: 'Help',
    children: 'Help',
  },
]

const RightMenu = ({ data = [] }: HeaderProps, ref: Ref<HTMLDivElement>) => {
  // TODO: LIVE DATA INTEGRATION
  const navMenu = data.length > 0 ? data : mockData

  return (
    <div className={styles.section} ref={ref}>
      <div className={styles.wrapper}>
        <LocaleSelector />
        {navMenu?.map((nav, idx) => {
          const { to, title, children } = nav

          return (
            <Link key={`nav-link-${idx + 1}`} to={to} title={title}>
              {children}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default forwardRef(RightMenu)
