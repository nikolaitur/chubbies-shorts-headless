import { useFetcher } from '@remix-run/react'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon/dist/button-icon'
import { CloseIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import Input from '@solo-brands/ui-library.ui.atomic.input'
import MessageCard from '@solo-brands/ui-library.ui.atomic.message-card/dist/message-card'
import Spinner from '@solo-brands/ui-library.ui.atomic.spinner/dist/spinner'
import clsx from 'clsx'
import { Formik } from 'formik'
import * as yup from 'yup'
import Backdrop from '~/components/backdrop'
import Portal from '~/components/portal'
import { useIsMounted, useOverlayController } from '~/hooks'
import styles from './styles.module.css'
import { ResetPasswordModalProps } from './types'

const validationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('This field is required'),
})

const initialValues = {
  email: '',
}

const ResetPasswordModal = ({ openControllerRef, ...props }: ResetPasswordModalProps) => {
  const isMounted = useIsMounted()
  const { isShown, hideOverlay } = useOverlayController(
    {
      openControllerRef,
    },
    [isMounted],
  )

  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === 'loading' || fetcher.state === 'submitting'
  const { formError, resetRequested, email } = fetcher.data ?? {}
  const shouldDisplayMessage = (!isSubmitting && formError) || (!isSubmitting && resetRequested)
  const successMessage = `Reset password link has been sent this email: ${email}`

  return (
    <Portal className="reset-password-modal-portal">
      <div className={clsx(styles.wrapper, { [styles.isShown]: isShown })} {...props}>
        <div className={styles.header}>
          <ButtonIcon variant="minimal" size="sm" icon={<CloseIcon />} onClick={hideOverlay} />
        </div>

        <div className={styles.body}>
          <div className={styles.titleBlock}>
            <p className={styles.title}>Reset Password</p>
            <p className={styles.info}>Enter your email address to reset your password.</p>
          </div>

          {shouldDisplayMessage && (
            <MessageCard
              title={formError ?? successMessage}
              variant={resetRequested ? 'positive' : 'critical'}
              size="xs"
            />
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnBlur={false}
            onSubmit={() => {}}
          >
            {({ isValid }) => {
              return (
                <fetcher.Form action="/api/account/recover" method="post" className={styles.form}>
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="Your password"
                    size="xs"
                  />
                  <Button
                    className={styles.button}
                    variant="primary"
                    size="xs"
                    disabled={isSubmitting || !isValid}
                  >
                    {isSubmitting && <Spinner />}
                    Recover
                  </Button>
                </fetcher.Form>
              )
            }}
          </Formik>
        </div>
      </div>
      <Backdrop isShown={isShown} onClick={hideOverlay} />
    </Portal>
  )
}

export default ResetPasswordModal
