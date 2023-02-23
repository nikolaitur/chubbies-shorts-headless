import Container from '@solo-brands/ui-library.ui.atomic.container'

import FooterSocialLinks from './footer-social-links'
import FooterLegalLinks from './footer-legal-links'
import FooterResources from './footer-resources'
import FooterNav from './footer-nav'

import { FooterProps } from './types'

import styles from './styles.module.css'

const Footer = ({ data, ...props }: FooterProps) => (
  <footer className={styles.section} {...props}>
    <Container fullWidth={true}>
      <div className={styles.grid}>
        <FooterSocialLinks className={styles.mobile} />
        <div className={styles.divider} />
        <FooterResources className={styles.mobile} />
        <div className={styles.divider} />
        <FooterNav navigation={data?.footerMenu} />
        <div className={styles.divider} />
        <FooterLegalLinks legalLinks={data?.footerLegalLinks} />
      </div>
    </Container>
  </footer>
)

export default Footer
