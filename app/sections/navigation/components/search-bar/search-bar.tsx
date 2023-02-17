import { CloseIcon, SearchIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import { ChangeEventHandler, forwardRef, Ref, useState } from 'react'
import styles from './styles.module.css'
import { SearchBarProps } from './types'

const SearchBar = ({ ...props }: SearchBarProps, ref: Ref<HTMLDivElement>) => {
  const [inputValue, setInputValue] = useState('')

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
    setInputValue(event.target.value)
  }

  const onClearHandler = () => {
    setInputValue('')
  }

  return (
    <div className={clsx(styles.wrapper)} ref={ref} {...props}>
      <i className={styles.searchIcon}>
        <SearchIcon size="xs" as={'span'} />
      </i>
      <input
        value={inputValue}
        className={styles.input}
        placeholder="Search..."
        onChange={onChangeHandler}
      />
      {inputValue.length > 0 && (
        <i className={styles.closeIcon}>
          <CloseIcon size="xs" as={'span'} onClick={onClearHandler} />
        </i>
      )}
    </div>
  )
}

export default forwardRef(SearchBar)
