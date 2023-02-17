import clsx from 'clsx'
import { forwardRef, Ref } from 'react'
import Link from '../link'
import styles from './styles.module.css'
import { MenuLinkProps } from './types'

const mockData = [
  {
    title: 'Feature',
    isMegaMenu: true,
  },
  {
    title: 'Shorts',
    isMegaMenu: true,
  },
  {
    title: 'Swim',
    isMegaMenu: true,
  },
  {
    title: 'Pants',
    isMegaMenu: true,
  },
  {
    title: 'Tops',
    isMegaMenu: true,
  },
  {
    title: 'Kids',
    isMegaMenu: false,
  },
  {
    title: 'Extras',
    isMegaMenu: true,
  },
  {
    title: 'Sale',
    isMegaMenu: true,
  },
  {
    title: 'Shop by Inseam',
    isMegaMenu: true,
  },
]

const MenuLinks = ({ ...props }: MenuLinkProps, ref: Ref<HTMLDivElement>) => (
  <div className={clsx(styles.wrapper)} ref={ref} {...props}>
    <ul className={styles.navList}>
      {mockData.map((nav, idx) => (
        <Link key={`mega-menu-${idx + 1}`} {...nav} />
      ))}
    </ul>
  </div>
)

export default forwardRef(MenuLinks)
