import { MenuFragment } from '~/graphql/generated'

import InternalLink from '~/components/internal-link'

import styles from './styles.module.css'

const FooterLegalLinks = ({ legalLinks }: { legalLinks?: MenuFragment | null }) => {
  return (
    <div className={styles.component}>
      <p>© 2023 Chubbies Inc. - The Weekend Has Arrived - All Rights Reserved</p>
      <div className={styles.links}>
        {legalLinks?.items?.map(({ url, title }) =>
          url ? (
            <InternalLink key={title} to={url}>
              {title}
            </InternalLink>
          ) : null,
        )}
      </div>
    </div>
  )
}

export default FooterLegalLinks
