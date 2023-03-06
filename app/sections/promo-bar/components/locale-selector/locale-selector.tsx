import { useMatches } from '@remix-run/react'
import Icon, { ChevronDownIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import { forwardRef, Ref } from 'react'
import styles from './styles.module.css'
import { HeaderProps } from './types'

const LocaleSelector = ({ ...props }: HeaderProps, ref: Ref<HTMLDivElement>) => {
  const [root] = useMatches()
  const selectedLocale = root?.data?.selectedLocale
  const isUSA = selectedLocale?.country === 'US'
  if (isUSA) return <></>
  return (
    <div className={styles.wrapper} {...props} ref={ref}>
      <span>{selectedLocale?.label}</span>
      <Icon as={ChevronDownIcon} />
    </div>
  )
}

export default forwardRef(LocaleSelector)
