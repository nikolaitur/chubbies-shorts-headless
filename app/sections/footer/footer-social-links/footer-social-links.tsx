import {
  FacebookIcon,
  InstagramIcon,
  SnapChatIcon,
  TiktokIcon,
  YoutubeIcon,
} from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'

import styles from './styles.module.css'

const FooterSocialLinks = ({ className }: { className?: string }) => (
  <div className={clsx(styles.component, className)}>
    <h4 className={styles.title}>Follow Us</h4>
    <div className={styles.icons}>
      {/*@ts-expect-error TODO: Add href to icon*/}
      <FacebookIcon size="sm" as="a" href="https://www.facebook.com/" />
      {/*@ts-expect-error TODO: Add href to icon*/}
      <YoutubeIcon size="sm" as="a" href="https://www.youtube.com/" />
      {/*@ts-expect-error TODO: Add href to icon*/}
      <InstagramIcon size="sm" as="a" href="https://www.instagram.com/" />
      {/*@ts-expect-error TODO: Add href to icon*/}
      <SnapChatIcon size="sm" as="a" href="https://www.snapchat.com/" />
      {/*@ts-expect-error TODO: Add href to icon*/}
      <TiktokIcon size="sm" as="a" href="https://www.tiktok.com/en/" />
    </div>
  </div>
)

export default FooterSocialLinks
