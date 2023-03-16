//TODO: Can be create on ui-library
import { CSSProperties } from 'react'
import styles from './styles.module.css'
import { ProgressBarProps } from './types'

const ProgressBar = ({ percent }: ProgressBarProps) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.progress}
        style={{ '--percent-value': `${percent}%` } as CSSProperties}
      >
        {percent || '100'}
      </div>
      <span className={styles.goal}>200</span>
    </div>
  )
}

export default ProgressBar
