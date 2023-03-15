import { useFetcher } from '@remix-run/react'
import { Image } from '@shopify/hydrogen'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon/dist/button-icon'
import Checkbox from '@solo-brands/ui-library.ui.atomic.checkbox'
import { CheckIcon, CloseIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import Input from '@solo-brands/ui-library.ui.atomic.input'
import MessageCard from '@solo-brands/ui-library.ui.atomic.message-card/dist/message-card'
import Spinner from '@solo-brands/ui-library.ui.atomic.spinner/dist/spinner'
import clsx from 'clsx'
import { Formik } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import AccountSocmedButtons from '~/components/account-socmed-buttons/account-socmed-buttons'
import Backdrop from '~/components/backdrop'
import Portal from '~/components/portal'
import { AUTH_VALIDATION_SCHEMA } from '~/constants'
import { useOverlayController } from '~/hooks'
import styles from './styles.module.css'
import { SignUpModalProps } from './types'

const validationSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('This field is required'),
  password: yup.string().required('This field is required'),
})

const formInitialValue = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

const SignUpModal = ({ openControllerRef, ...props }: SignUpModalProps) => {
  const { isShown, hideOverlay } = useOverlayController({
    openControllerRef,
  })

  const fetcher = useFetcher()
  const isRegistering = fetcher.state === 'loading' || fetcher.state === 'submitting'
  const { formError } = fetcher.data ?? {}
  const shouldDisplayErrorMessage = !isRegistering && formError

  return (
    <Portal className="sign-up-modal-portal">
      <div className={clsx(styles.wrapper, { [styles.isShown]: isShown })} {...props}>
        <div className={clsx(styles.header, styles.mobile)}>
          <ButtonIcon variant="minimal" size="sm" icon={<CloseIcon />} onClick={hideOverlay} />
        </div>
        <div className={styles.imageBlock}>
          <Image
            className={styles.image}
            data={{
              altText: 'test',
              url: 'https://cdn.shopify.com/s/files/1/0077/0432/files/signup-modal-banner_540x.png?v=1643989965',
            }}
          />
          <div className={styles.imageBlockText}>
            <p className={styles.heading}>Welcome to Chubbies!</p>
            <ul className={styles.checklist}>
              <li>
                <CheckIcon size="xs" />
                Easy tracking of your orders
              </li>
              <li>
                <CheckIcon size="xs" />
                Exclusive deals and discounts
              </li>
              <li>
                <CheckIcon size="xs" />
                Welcome bonus of 50 reward points
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.formBlock}>
          <div className={clsx(styles.header, styles.desktop)}>
            <ButtonIcon variant="minimal" size="sm" icon={<CloseIcon />} onClick={hideOverlay} />
          </div>

          <div className={styles.body}>
            <div className={styles.titleBlock}>
              <p className={styles.title}>Create your account</p>
              <p className={styles.text}>
                Already have an account yet?{' '}
                <Link to="" className={styles.link}>
                  Sign In
                </Link>
              </p>
            </div>

            {shouldDisplayErrorMessage && (
              <MessageCard title={formError} variant="critical" size="xs" />
            )}

            <Formik
              initialValues={formInitialValue}
              validationSchema={AUTH_VALIDATION_SCHEMA}
              validateOnBlur={false}
              onSubmit={() => {}}
            >
              {({ isValid }) => {
                return (
                  <fetcher.Form
                    className={styles.form}
                    action="/api/account/register"
                    method="post"
                  >
                    <div className={styles.nameFieldWrapper}>
                      <Input
                        label="First Name"
                        name="firstName"
                        placeholder="Your name"
                        isRequired
                        size="xs"
                      />
                      <Input
                        label="Last Name"
                        name="lastName"
                        placeholder="Your name"
                        isRequired
                        size="xs"
                      />
                    </div>
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      isRequired
                      size="xs"
                    />
                    <Input
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Must be 5 to 12 characters"
                      isRequired
                      size="xs"
                    />
                    <Checkbox
                      name="remember"
                      label="Sign up for our news letter to stay in the loop about hot deals, new products, and more. You can unsubscribe at any time, no worries."
                    />
                    <p className={styles.terms}>
                      By clicking ”Join Chubbies”, you agree to our{' '}
                      <Link to="" className={styles.link}>
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="" className={styles.link}>
                        Privacy Policy.
                      </Link>
                    </p>
                    {/* ReCaptcha */}
                    <Button
                      className={styles.joinButton}
                      type="submit"
                      size="xs"
                      disabled={isRegistering || !isValid}
                    >
                      {isRegistering && <Spinner />}
                      Join Chubbies
                    </Button>
                  </fetcher.Form>
                )
              }}
            </Formik>
            <AccountSocmedButtons />
          </div>
        </div>
      </div>
      <Backdrop isShown={isShown} onClick={hideOverlay} />
    </Portal>
  )
}

export default SignUpModal
