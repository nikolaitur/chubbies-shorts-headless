import { forwardRef, Ref } from 'react'

import LocaleSelector from '../locale-selector'
import InternalLink from '~/components/internal-link'

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
          <InternalLink key={`nav-link-${idx + 1}`} to={url} title={title}>
            {title}
          </InternalLink>
        )
      })}
    </div>
  </div>
)

export default forwardRef(RightMenu)
