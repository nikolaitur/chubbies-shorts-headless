import Container from '@solo-brands/ui-library.ui.atomic.container'

import FooterLegalLinks from './footer-legal-links'
import FooterNav from './footer-nav'
import FooterResources from './footer-resources'
import FooterSocialLinks from './footer-social-links'

import { FooterProps } from './types'

import styles from './styles.module.css'

const Footer = ({ menu, legalLinks, ...props }: FooterProps) => (
  <footer className={styles.section} {...props}>
    <Container fullWidth={true}>
      <div className={styles.grid}>
        <FooterSocialLinks className={styles.mobile} />
        <div className={styles.divider} />
        <FooterResources className={styles.mobile} />
        <div className={styles.divider} />
        <FooterNav navigation={menu} />
        <div className={styles.divider} />
        <FooterLegalLinks legalLinks={legalLinks} />
      </div>
    </Container>
  </footer>
)

export default Footer
