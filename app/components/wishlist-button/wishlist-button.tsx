import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import { HeartIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import { useState } from 'react'
import styles from './styles.module.css'
import { WishlistButtonProps } from './types'

const WishlistButton = ({ ...props }: WishlistButtonProps) => {
  const [isInWishlist, setIsInWishlist] = useState(false)

  const handleWishList = () => {
    setIsInWishlist(!isInWishlist)

    //TODO: logic
  }
  return (
    <ButtonIcon
      variant="tertiary"
      size="sm"
      border="rounded"
      // @ts-expect-error - TODO: fix type error in UI Library
      icon={<HeartIcon className={clsx(styles.button, { [styles.filled]: isInWishlist })} />}
      onClick={handleWishList}
      {...props}
    />
  )
}

export default WishlistButton
