import Button from '@solo-brands/ui-library.ui.atomic.button'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

import styles from './styles.module.css'

const PHONE_NUMBER = '+15123577845'

const FooterResources = ({ className }: { className?: string }) => {
  const [isGladlyChatOpen, setIsGladyChatOpen] = useState(false)

  useEffect(() => {
    if (isGladlyChatOpen) {
      const script = document.createElement('script')
      script.setAttribute('type', 'text/javascript')
      script.innerHTML = `GladlyHelpApp.show()`
      document.head.appendChild(script)

      setIsGladyChatOpen(false)
    }
  }, [isGladlyChatOpen])

  const openGladlyChat = () => {
    setIsGladyChatOpen(true)
  }
  return (
    <div className={clsx(styles.component, className)}>
      <h4 className={clsx(styles.title, styles.desktop)}>Resources</h4>
      <h4 className={clsx(styles.title, styles.mobile)}>Need Help</h4>
      <p className={styles.description}>We&apos;re here to help you with your order!</p>
      <div className={styles.actions}>
        <Button
          as="a"
          //@ts-expect-error TODO: change types for button with "as" attribute
          href={`sms:${PHONE_NUMBER}`}
          variant="tertiary"
          className={clsx(styles.button, styles.mobile)}
        >
          Text Us
        </Button>
        <Button
          onClick={() => navigator.clipboard.writeText(PHONE_NUMBER)}
          variant="tertiary"
          className={clsx(styles.button, styles.desktop)}
        >
          TEXT (512) 357-7845
        </Button>
        <Button variant="secondary" className={styles.button} onClick={openGladlyChat}>
          Live Chat
        </Button>
      </div>
      <p className={clsx(styles.description, styles.time)}>
        Mon-Fri: 8am-5pm PST / Sat-Sun: 9am-1pm PST
      </p>
    </div>
  )
}

export default FooterResources
