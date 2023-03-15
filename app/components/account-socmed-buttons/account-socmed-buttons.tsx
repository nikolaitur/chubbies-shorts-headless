import ButtonSocialLogin from '@solo-brands/ui-library.ui.atomic.button-social-login'
import styles from './styles.module.css'
import { AccountSocmedButtonsProps } from './types'

const AccountSocmedButtons = (props: AccountSocmedButtonsProps) => {
  return (
    <div className={styles.wrapper} {...props}>
      <span className={styles.title}>Sign in with social media</span>
      <div className={styles.buttons}>
        <ButtonSocialLogin size="xs" variant="google" />
        <ButtonSocialLogin size="xs" variant="facebook" />
        <ButtonSocialLogin size="xs" variant="amazon" />
      </div>
    </div>
  )
}

export default AccountSocmedButtons
