export default [
  {
    type: 'private',
    to: '/account/orders',
    title: 'My Orders',
    subtitle: 'View & track your orders',
    withArrow: true,
  },
  {
    type: 'public',
    to: '/account/wishlist',
    title: 'Wishlist',
    subtitle: 'View wishlist items',
    withArrow: true,
  },

  {
    type: 'private',
    to: '/account/address',
    title: 'Address Book',
    subtitle: 'Save and manage your favourite addresses',
    withArrow: true,
  },
  {
    type: 'private',
    to: '/account/settings',
    title: 'Account Settings',
    subtitle: 'Contact info, email address and password',
    withArrow: true,
  },

  {
    type: 'public',
    to: '/refer-a-friend',
    title: 'Refer a Friend',
    subtitle: (
      <>
        Tell your friends about Chubbies and <span>get $15!</span>
      </>
    ),
    withArrow: false,
  },
]
