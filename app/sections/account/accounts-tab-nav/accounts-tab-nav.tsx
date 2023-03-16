import { useLocation } from '@remix-run/react'
import AccountsTabNavItem from './accounts-tab-nav-item/accounts-tab-nav-item'
import styles from './styles.module.css'

//TODO: Will add URL after merging all accounts page and transfer to constants
export const tabHeadings = [
  { title: 'Home', url: '' },
  { title: 'Order History', url: '' },
  { title: 'Addressess', url: '' },
  { title: 'Rewards', url: '' },
  { title: 'Refer', url: '' },
  { title: 'Wishlist', url: '' },
  { title: 'Saved for Later', url: '' },
  { title: 'Order History', url: '' },
]

const AccountsTabNav = () => {
  const { pathname: path } = useLocation()

  return (
    <div className={styles.wrapper}>
      {tabHeadings?.map((heading, index) => {
        const { title, url } = heading
        return (
          <AccountsTabNavItem
            key={`account-tab-item-${index}`}
            title={title}
            url={url}
            isActive={path === url}
          />
        )
      })}
    </div>
  )
}

export default AccountsTabNav
