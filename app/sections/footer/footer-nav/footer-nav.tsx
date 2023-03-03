import clsx from 'clsx'
import { MenuFragment } from '~/graphql/generated'

import FooterResources from '~/sections/footer/footer-resources'
import FooterSocialLinks from '~/sections/footer/footer-social-links'
import InternalLink from '~/components/internal-link'

import styles from './styles.module.css'

const FooterNav = ({ navigation }: { navigation?: MenuFragment | null }) => (
  <div className={styles.component}>
    {navigation?.items?.map((navItem, index) => {
      const isLastItem = index === navigation.items.length - 1
      const isMobileHidden = navItem.title === 'Shop at Chubbies'

      return (
        <div
          key={navItem.title}
          className={clsx(styles.navItem, { [styles.mobileHidden]: isMobileHidden })}
        >
          <h4 className={styles.title}>{navItem.title}</h4>
          <div className={styles.links}>
            {navItem.items.map(link =>
              link.url ? (
                <InternalLink className={styles.link} key={link.title} to={link.url}>
                  {link.title}
                </InternalLink>
              ) : null,
            )}
          </div>
          {isLastItem ? (
            <FooterSocialLinks className={clsx(styles.social, styles.desktop)} />
          ) : null}
        </div>
      )
    })}
    <FooterResources className={styles.desktop} />
  </div>
)

export default FooterNav
