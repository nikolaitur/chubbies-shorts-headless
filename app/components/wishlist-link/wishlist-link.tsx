import { HeartIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useWishlistSize } from '~/wishlist/WishlistClient'
import styles from './styles.module.css'
import { WishlistLinkProps } from './types'

const WishlistLink = ({ ...props }: WishlistLinkProps) => {
  const { size } = useWishlistSize()

  return (
    <Link to="/wishlists/mine" {...props}>
      <HeartIcon
        // @ts-expect-error - TODO: fix type error in UI Library
        className={clsx(styles.button, { [styles.filled]: size > 0 })}
      />
    </Link>
  )
}

export default WishlistLink
