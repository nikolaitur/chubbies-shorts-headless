import { Link } from '@remix-run/react'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import {
  FacebookIcon,
  InstagramIcon,
  SnapChatIcon,
  TiktokIcon,
  YoutubeIcon,
} from '@solo-brands/ui-library.ui.atomic.icon'
import Input from '@solo-brands/ui-library.ui.atomic.input'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import AccountsGridNav from '../accounts-grid-nav/accounts-grid-nav'
import styles from './styles.module.css'

const validationSchema = yup.object().shape({
  emailAddress: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
})

const initialValues = {
  emailAddress: '',
  password: '',
}

const AccountsDefaultPage = () => (
  <div className={styles.wrapper}>
    <AccountsGridNav />
    <div className={styles.grid}>
      <div className={styles.signInWrapper}>
        <h2 className={styles.title}>Sign in</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          <Form className={styles.form}>
            <Input label="Email Address" name="emailAddress" isRequired />
            <Input label="Password" name="password" isRequired />
            {/* TODO: Insert reCAPTCHA */}
            <Button size="lg" variant="primary">
              Sign in
            </Button>
            <Link to={''} className={styles.link}>
              Forgot Password
            </Link>
          </Form>
        </Formik>
      </div>
      <div className={styles.icons}>
        <a href="https://www.facebook.com/chubbies" target="_blank" rel="noreferrer">
          <FacebookIcon size="lg" as="a" />
        </a>
        <a href="https://www.instagram.com/chubbies/" target="_blank" rel="noreferrer">
          <YoutubeIcon size="lg" as="a" />
        </a>
        <a href="https://www.youtube.com/chubbies/" target="_blank" rel="noreferrer">
          <InstagramIcon size="lg" as="a" />
        </a>
        <a href="https://www.tiktok.com/@chubbiesshorts/" target="_blank" rel="noreferrer">
          <SnapChatIcon size="lg" as="a" />
        </a>
        <a href="https://www.chubbiesshorts.com/pages/snapchat/" target="_blank" rel="noreferrer">
          <TiktokIcon size="lg" as="a" />
        </a>
      </div>
      <div className={styles.registerWrapper}>
        <h2 className={styles.title}>Register for a chubbies account</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          <Form className={styles.form}>
            <Input label="First Name" name="firstName" isRequired />
            <Input label="Last Name" name="lastName" isRequired />
            <Input label="Email Address" name="emailAddress" isRequired />
            <Input label="Password" name="password" isRequired />
            <Input label="Confirm Password" name="confirmPassword" isRequired />
            {/* TODO: Insert reCAPTCHA */}
            <Button size="lg" variant="primary">
              Sign Up
            </Button>
          </Form>
        </Formik>
      </div>
    </div>
  </div>
)

export default AccountsDefaultPage
