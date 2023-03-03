import Button from '@solo-brands/ui-library.ui.atomic.button'
import Input from '@solo-brands/ui-library.ui.atomic.input'
import { Formik } from 'formik'
import { useFetcher } from 'react-router-dom'
import * as yup from 'yup'
import Backdrop from '../backdrop'
import styles from './styles.module.css'
import { NotifyModalProps } from './types'

const validationSchema = yup.object().shape({
  email: yup.string().required('This field is required'),
})

const initialValues = {
  email: '',
}

const NotifyModal = ({ action, heading, text, submitButtonText, onClose }: NotifyModalProps) => {
  const fetcher = useFetcher()

  return (
    <>
      <div className={styles.modal}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.text}>{text}</p>
        {/* TODO in UI Library: remove formik as dependency in <Input>, form validation will happen in remix action */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {({ isValid }) => {
            return (
              <fetcher.Form className={styles.form} action={action} method="post">
                <Input
                  size="md"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  isValid={isValid}
                />
                <Button className={styles.submitButton} type="submit" size="md" disabled={!isValid}>
                  {submitButtonText}
                </Button>
                <button className={styles.nevermindButton} onClick={onClose}>
                  Nevermind
                </button>
              </fetcher.Form>
            )
          }}
        </Formik>
      </div>
      <Backdrop onClick={onClose} isShown />
    </>
  )
}

export default NotifyModal
