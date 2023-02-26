import { forwardRef, Ref } from 'react'
import { Link } from '@remix-run/react'

import LocaleSelector from '../locale-selector'
import { RightMenuProps } from './types'

import styles from './styles.module.css'

const RightMenu = ({ data }: RightMenuProps, ref: Ref<HTMLDivElement>) => (
  <div className={styles.section} ref={ref}>
    <div className={styles.wrapper}>
      {/*TODO: In localization*/}
      <LocaleSelector />
      {data?.items.map((nav, idx) => {
        const { url, title } = nav

        if (!url) return null

        return (
          <Link key={`nav-link-${idx + 1}`} to={url} title={title}>
            {title}
          </Link>
        )
      })}
    </div>
  </div>
)

export default forwardRef(RightMenu)
