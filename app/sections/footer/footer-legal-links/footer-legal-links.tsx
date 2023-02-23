import { Link } from '@remix-run/react'

import { EnhancedMenu } from '~/global-types'

import styles from './styles.module.css'

const FooterLegalLinks = ({ legalLinks }: { legalLinks?: EnhancedMenu }) => {
  return (
    <div className={styles.component}>
      <p>© 2023 Chubbies Inc. - The Weekend Has Arrived - All Rights Reserved</p>
      <div className={styles.links}>
        {legalLinks?.items?.map(({ url, title }) =>
          url ? (
            <Link key={title} to={url}>
              {title}
            </Link>
          ) : null,
        )}
      </div>
    </div>
  )
}

export default FooterLegalLinks
