import { useFetcher } from '@remix-run/react'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon/dist/button-icon'
import { CloseIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import Input from '@solo-brands/ui-library.ui.atomic.input'
import MessageCard from '@solo-brands/ui-library.ui.atomic.message-card/dist/message-card'
import Spinner from '@solo-brands/ui-library.ui.atomic.spinner/dist/spinner'
import clsx from 'clsx'
import { Formik } from 'formik'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import AccountSocmedButtons from '~/components/account-socmed-buttons'
import Backdrop from '~/components/backdrop'
import Portal from '~/components/portal/portal'
import { AUTH_VALIDATION_SCHEMA } from '~/constants'
import { useOverlayController } from '~/hooks'
import ResetPasswordModal from '../reset-password-modal'
import styles from './styles.module.css'
import { SignInModalProps } from './types'

const formInitialValue = {
  email: '',
  password: '',
}

const SignInModal = ({ openControllerRef, ...props }: SignInModalProps) => {
  const forgotPassButtonRef = useRef<HTMLButtonElement>(null)
  const { isShown, hideOverlay } = useOverlayController({
    openControllerRef,
    closeControllerRef: forgotPassButtonRef,
  })

  const fetcher = useFetcher()
  const isLoggingIn = fetcher.state === 'loading' || fetcher.state === 'submitting'
  const { formError } = fetcher.data ?? {}
  const shouldDisplayErrorMessage = !isLoggingIn && formError

  return (
    <>
      <Portal className="sign-in-modal-portal">
        <div className={clsx(styles.wrapper, { [styles.isShown]: isShown })} {...props}>
          <div className={styles.header}>
            <ButtonIcon variant="minimal" size="sm" icon={<CloseIcon />} onClick={hideOverlay} />
          </div>

          <div className={styles.body}>
            <div>
              <p className={styles.title}>Sign in to your account</p>
              <p className={styles.text}>
                Don&lsquo;t have an account yet?{' '}
                <Link to="" className={styles.signUpLink}>
                  Sign up
                </Link>
              </p>
            </div>

            {shouldDisplayErrorMessage && (
              <MessageCard title={formError} variant="critical" size="xs" />
            )}

            <div>
              <Formik
                initialValues={formInitialValue}
                validationSchema={AUTH_VALIDATION_SCHEMA}
                validateOnBlur={false}
                onSubmit={() => {}}
              >
                {({ isValid }) => {
                  return (
                    <fetcher.Form className={styles.form} action="/api/account/login" method="post">
                      <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        size="xs"
                        isRequired
                      />
                      <div className={styles.passwordFieldWrapper}>
                        <Input
                          label="Password"
                          name="password"
                          type="password"
                          placeholder="Your password"
                          size="xs"
                          isRequired
                        />
                        <div className={styles.forgotPasswordButtonWrapper}>
                          <button
                            type="button"
                            className={styles.forgotPasswordButton}
                            onClick={hideOverlay}
                            ref={forgotPassButtonRef}
                          >
                            Forgot Password
                          </button>
                        </div>
                      </div>

                      {/* ReCaptcha */}
                      <Button
                        className={styles.signInButton}
                        type="submit"
                        size="xs"
                        disabled={isLoggingIn || !isValid}
                      >
                        {isLoggingIn && <Spinner />}
                        Sign In
                      </Button>
                    </fetcher.Form>
                  )
                }}
              </Formik>
            </div>

            <AccountSocmedButtons />
          </div>
        </div>

        <Backdrop isShown={isShown} onClick={hideOverlay} />
      </Portal>
      <ResetPasswordModal openControllerRef={forgotPassButtonRef} />
    </>
  )
}

export default SignInModal
