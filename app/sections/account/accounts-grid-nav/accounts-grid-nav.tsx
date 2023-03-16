import GridNavCard from '../accounts-grid-nav-card/accounts-grid-nav-card'
import styles from './styles.module.css'

const AccountsGridNav = () => {
  //TODO: Static Data
  const image = [
    {
      altText: 'Get order updates',
      height: 68,
      width: 68,
      originalSrc:
        'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__orders-icon.png?v=4392453096032126121675186792',
      src: 'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__orders-icon.png?v=4392453096032126121675186792',
      transformedSrc:
        'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__orders-icon.png?v=4392453096032126121675186792',
      url: 'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__orders-icon.png?v=4392453096032126121675186792',
    },
    {
      altText: 'Earn points on every order',
      height: 68,
      width: 68,
      originalSrc:
        'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__rewards-icon.png?v=98872815613652925991675186794',
      src: 'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__rewards-icon.png?v=98872815613652925991675186794',
      transformedSrc:
        'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__rewards-icon.png?v=98872815613652925991675186794',
      url: 'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__rewards-icon.png?v=98872815613652925991675186794',
    },
    {
      altText: 'Manage Addresses',
      height: 68,
      width: 68,
      originalSrc:
        'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__address-icon.png?v=10066227134523732231675186792',
      src: 'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__address-icon.png?v=10066227134523732231675186792',
      transformedSrc:
        'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__address-icon.png?v=10066227134523732231675186792',
      url: 'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__address-icon.png?v=10066227134523732231675186792',
    },
    {
      altText: 'Refer friends for $',
      height: 68,
      width: 68,
      originalSrc:
        'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__refer-icon.png?v=17390906837768702441675186793',
      src: 'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__refer-icon.png?v=17390906837768702441675186793',
      transformedSrc:
        'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__refer-icon.png?v=17390906837768702441675186793',
      url: 'https://cdn.shopify.com/s/files/1/0077/0432/t/1153/assets/account__refer-icon.png?v=17390906837768702441675186793',
    },
  ]

  return (
    <div className={styles.wrapper}>
      {image?.map((media, index) => {
        return <GridNavCard image={media} key={index} />
      })}
    </div>
  )
}

export default AccountsGridNav
