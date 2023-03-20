// TODO: Will be done in Search Page and search functionality
import { useNavigate } from '@remix-run/react'
import { CloseIcon, SearchIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import { Form, Formik } from 'formik'
import { ChangeEventHandler, forwardRef, HTMLAttributes, Ref, useState } from 'react'

import styles from './styles.module.css'

const SearchBar = ({ ...props }: HTMLAttributes<HTMLElement>, ref: Ref<HTMLDivElement>) => {
  const navigate = useNavigate()
  const [inputValue, setInputValue] = useState('')
  const initialValues = {
    q: '',
  }

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
    setInputValue(event.target.value)
  }

  const onClearHandler = () => {
    setInputValue('')
  }

  const onSearchSubmit = () => {
    navigate(`search?q=${inputValue}`, { replace: true })
  }

  return (
    <div className={styles.inputWrapper} ref={ref}>
      <Formik initialValues={initialValues} onSubmit={() => onSearchSubmit()}>
        <Form className={styles.form}>
          <button className={styles.searchIcon}>
            <SearchIcon size="xs" as={'span'} />
          </button>
          {/*TODO: TypeError: formik.getFieldProps is not a function*/}
          <input
            name="q"
            className={styles.input}
            placeholder="Search..."
            onChange={onChangeHandler}
          />

          {!!inputValue.length && (
            <button className={styles.closeIcon} onClick={onClearHandler}>
              <CloseIcon size="xs" as={'span'} />
            </button>
          )}
        </Form>
      </Formik>
    </div>
  )
}

export default forwardRef(SearchBar)
