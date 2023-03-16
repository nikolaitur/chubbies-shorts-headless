import { Link } from '@remix-run/react'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import Checkbox from '@solo-brands/ui-library.ui.atomic.checkbox'
import Dropdown from '@solo-brands/ui-library.ui.atomic.dropdown'
import { Option } from '@solo-brands/ui-library.ui.atomic.dropdown/dist/dropdown'
import Input from '@solo-brands/ui-library.ui.atomic.input'
import { Form, Formik } from 'formik'
import { ClientOnly } from 'remix-utils'
import * as yup from 'yup'
import styles from './styles.module.css'

const validationSchema = yup.object().shape({
  firstName: yup.string().required('This field is required'),
  lastName: yup.string().required('This field is required'),
})

const initialValues = {
  firstName: '',
  lastName: '',
  checkbox: false,
}

const options = [
  {
    value: 'option_1',
    text: 'Option 1',
  },
  {
    value: 'option_2',
    text: 'Option 2',
  },
  {
    value: 'option_3',
    text: 'Option 3',
  },
] as Option[]

const AddressForm = () => {
  return (
    <ClientOnly>
      {() => (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          <Form className={styles.form}>
            <div className={styles.wrapper}>
              <Checkbox label="Make Default" name="checkbox" className={styles.checkBox} />
              <Link to={''} className={styles.deleteButton}>
                Delete
              </Link>
            </div>
            <div className={styles.fieldGrid}>
              <Input
                label="First Name"
                name="firstName"
                className={styles.inputContainer}
                isRequired
              />
              <Input
                label="First Name"
                name="lastName"
                className={styles.inputContainer}
                isRequired
              />
            </div>
            <Input
              label="Address 1"
              name="address_1"
              className={styles.inputContainer}
              isRequired
            />
            <Input label="Address 2" name="address_2" className={styles.inputContainer} />

            <div className={styles.fieldGrid}>
              <Input label="City" name="city" className={styles.inputContainer} isRequired />

              <div>
                <Dropdown
                  size="md"
                  label="Country"
                  className={styles.dropdown}
                  options={options}
                  isRequired
                />
              </div>
            </div>
            <div className={styles.fieldGrid}>
              <div>
                <Dropdown
                  size="md"
                  label="State"
                  className={styles.dropdown}
                  options={options}
                  isRequired
                />
              </div>
              <Input label="Zip Code" name="zip" className={styles.inputContainer} />
            </div>
            <div>
              <Input
                label="Phone Number"
                name="phone"
                className={styles.inputContainer}
                isRequired
              />
            </div>
            <div className={styles.actionButtons}>
              <Button size="md" variant="tertiary">
                Cancel
              </Button>
              <Button size="md" variant="primary">
                Add Address
              </Button>
            </div>
          </Form>
        </Formik>
      )}
    </ClientOnly>
  )
}

export default AddressForm
