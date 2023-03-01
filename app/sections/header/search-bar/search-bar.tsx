// TODO: Will be done in Search Page and search functionality
import { CloseIcon, SearchIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import { ChangeEventHandler, forwardRef, Ref, useState } from 'react'

import styles from './styles.module.css'

const SearchBar = ({ onClose }: { onClose: () => void }, ref: Ref<HTMLDivElement>) => {
  const [inputValue, setInputValue] = useState('')

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
    setInputValue(event.target.value)
  }

  const onClearHandler = () => {
    setInputValue('')
    onClose()
  }

  return (
    <div className={styles.inputWrapper} ref={ref}>
      <button className={styles.searchIcon}>
        <SearchIcon size="xs" as={'span'} />
      </button>
      {/*TODO: TypeError: formik.getFieldProps is not a function*/}
      <input
        value={inputValue}
        className={styles.input}
        placeholder="Search..."
        onChange={onChangeHandler}
      />
      {!!inputValue.length && (
        <button className={styles.closeIcon} onClick={onClearHandler}>
          <CloseIcon size="xs" as={'span'} />
        </button>
      )}
    </div>
  )
}

export default forwardRef(SearchBar)
