import Button from '@solo-brands/ui-library.ui.atomic.button'
import Input from '@solo-brands/ui-library.ui.atomic.input'
import { Formik } from 'formik'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import * as yup from 'yup'
import styles from './styles.module.css'

export type GiftCouponCodeProps = HTMLAttributes<HTMLDivElement>

const GiftCouponCode = ({ ...props }: GiftCouponCodeProps, ref: Ref<HTMLDivElement>) => {
  // TO-DO: Move validation schema to separate file
  const validationSchema = yup.object().shape({
    code: yup.string().required('Invalid code, try again.'),
  })

  const initialValues = {
    code: 'FREE2023',
  }

  const enableForm = false

  return (
    <div className={styles.giftCouponCode} ref={ref} {...props}>
      {enableForm ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {({ isValid }) => {
            return (
              <div className={styles.form}>
                {/* TO-DO: Input height should be 40px if size is "xs" */}
                <Input name="code" size="xs" isRequired isValid={isValid} />
                <Button size="xs">Apply</Button>
              </div>
            )
          }}
        </Formik>
      ) : (
        <button className={styles.button}>Got a promo code?</button>
      )}
    </div>
  )
}

export default forwardRef(GiftCouponCode)
