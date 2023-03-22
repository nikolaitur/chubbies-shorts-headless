import clsx from 'clsx'
import { forwardRef, Ref } from 'react'

import Link from '~/components/link'
import LocaleSelector from '../locale-selector'

import { RightMenuProps } from './types'

import styles from './styles.module.css'

const RightMenu = ({ data }: RightMenuProps, ref: Ref<HTMLDivElement>) => (
  <div className={clsx(styles.section, 'right-announcement-menu')} ref={ref}>
    <div className={styles.wrapper}>
      {/*TODO: In localization*/}
      <LocaleSelector />
      {data?.items.map((nav, idx) => {
        const { url, title } = nav

        const reload = url.includes('rewards')

        if (!url) return null

        return (
          <Link key={`nav-link-${idx + 1}`} to={url} title={title} reloadDocument={reload}>
            {title}
          </Link>
        )
      })}
    </div>
  </div>
)

export default forwardRef(RightMenu)
