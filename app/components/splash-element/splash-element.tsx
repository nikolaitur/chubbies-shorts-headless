import clsx from 'clsx'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { SplashElementProps } from './types'

const colors = ['#2f7fd0', '#01C6E4', '#30b364', '#f5c219']
const initialTransformSet = Array(12).fill('none')

const renderSplashes = (transformSet: string[]) =>
  transformSet.map((transform, i) => (
    <span
      key={i}
      className={styles.splash}
      style={{
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        transform,
      }}
    />
  ))

const SplashElement = ({ shouldTrigger, ...props }: SplashElementProps) => {
  const [transformSet, setTransformSet] = useState<string[]>(initialTransformSet)

  useEffect(() => {
    if (shouldTrigger) {
      const newTransformSet = []

      for (let i = 0; i < 12; i++) {
        const prefix = Math.floor(Math.random() * 2) === 0 ? '-' : '+'
        const translate =
          'translate3d(-' +
          Math.floor(Math.random() * 32) +
          'px, ' +
          prefix +
          Math.floor(Math.random() * 32) +
          'px, 0) scale(0.2)'
        newTransformSet.push(translate)
      }

      setTransformSet(newTransformSet)
    } else {
      setTransformSet(initialTransformSet)
    }
  }, [shouldTrigger])

  return (
    <div className={clsx(styles.wrapper, { [styles.blastoff]: shouldTrigger })} {...props}>
      <div className={clsx(styles.splasher, styles.left)} />
      <div className={clsx(styles.splashes, styles.left)}>{renderSplashes(transformSet)}</div>
      <div className={styles.partybtnBg} />
      <div className={clsx(styles.splasher, styles.right)} />
      <div className={clsx(styles.splashes, styles.right)}>{renderSplashes(transformSet)}</div>
    </div>
  )
}

export default SplashElement
