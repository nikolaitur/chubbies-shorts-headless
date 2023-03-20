import {
  FacebookIcon,
  InstagramIcon,
  SnapChatIcon,
  TiktokIcon,
  YoutubeIcon,
} from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import { ClientOnly } from 'remix-utils'

import styles from './styles.module.css'

const FooterSocialLinks = ({ className }: { className?: string }) => (
  <ClientOnly>
    {() => (
      <div className={clsx(styles.component, className)}>
        <h4 className={styles.title}>Follow Us</h4>
        <div className={styles.icons}>
          <a href="https://www.facebook.com/chubbies" target="_blank" rel="noreferrer">
            <FacebookIcon size="sm" />
          </a>
          <a href="https://www.instagram.com/chubbies/" target="_blank" rel="noreferrer">
            <YoutubeIcon size="sm" />
          </a>
          <a href="https://www.youtube.com/chubbies/" target="_blank" rel="noreferrer">
            <InstagramIcon size="sm" />
          </a>
          <a href="https://www.tiktok.com/@chubbiesshorts/" target="_blank" rel="noreferrer">
            <TiktokIcon size="sm" />
          </a>
          <a href="https://www.chubbiesshorts.com/pages/snapchat/" target="_blank" rel="noreferrer">
            <SnapChatIcon size="sm" />
          </a>
        </div>
      </div>
    )}
  </ClientOnly>
)

export default FooterSocialLinks
