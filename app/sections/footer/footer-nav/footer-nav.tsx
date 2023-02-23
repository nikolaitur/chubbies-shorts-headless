import clsx from 'clsx'
import { Link } from '@remix-run/react'

import FooterResources from '~/sections/footer/footer-resources'
import FooterSocialLinks from '~/sections/footer/footer-social-links'

import { EnhancedMenu } from '~/global-types'

import styles from './styles.module.css'

const FooterNav = ({ navigation }: { navigation?: EnhancedMenu }) => (
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
                <Link className={styles.link} key={link.title} to={link.url}>
                  {link.title}
                </Link>
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
