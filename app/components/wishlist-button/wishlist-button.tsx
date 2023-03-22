import ButtonIcon from '@solo-brands/ui-library.ui.atomic.button-icon'
import { HeartIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import { useWishlistProduct } from '~/wishlist/WishlistClient'
import styles from './styles.module.css'
import { WishlistButtonProps } from './types'

const WishlistButton = ({ productId = '', variantId, ...props }: WishlistButtonProps) => {
  const { inWishlist, loading, submitting, toggleProduct } = useWishlistProduct({
    productId,
    variantId,
  })

  return (
    <ButtonIcon
      variant="tertiary"
      size="sm"
      border="rounded"
      icon={
        <HeartIcon
          // @ts-expect-error - TODO: fix type error in UI Library
          className={clsx(styles.button, {
            [styles.filled]: inWishlist,
          })}
        />
      }
      onClick={toggleProduct}
      disabled={loading || submitting}
      {...props}
    />
  )
}

export default WishlistButton
