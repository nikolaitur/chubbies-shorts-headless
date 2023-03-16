import { Link } from '@remix-run/react'
import Price from '@solo-brands/ui-library.ui.atomic.price/dist/price'
import ProductTitle from '@solo-brands/ui-library.ui.atomic.product-title'
//TODO: Uncomment after OrderImage is merged
// import OrderImage from './account-order-image/account-order-image'
import styles from './styles.module.css'

const AccountOrderDetails = () => {
  //TODO: Remove after adding logic
  const image = {
    alt: 'Refer friends for $',
    width: '104',
    height: '104',
    src: 'https://cdn.shopify.com/s/files/1/0077/0432/products/499223-03_DazedandAmused_2916_200x.webp?v=1666290758',
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.orderInfo}>
        <span className={styles.ordernumber}>Order #4004054</span>
        <span className={styles.orderDate}>Dec 08, 2022</span>
      </div>
      <Link to={''} className={styles.link}>
        Track Order
      </Link>
      <div className={styles.orderDetails}>
        <div className={styles.contentInfo}>
          <span className={styles.title}>
            Shipping Address
            <br />
          </span>
          <span className={styles.details}>
            Duncan Fairley <br />
            1721 36th Ct SE <br />
            Olympia, WA, 98501
          </span>
        </div>
        <div className={styles.contentInfo}>
          <span className={styles.title}>
            Billing Address
            <br />
          </span>
          <span className={styles.details}>
            Duncan Fairley <br />
            1721 36th Ct SE <br />
            Olympia, WA, 98501
          </span>
        </div>
        <div className={styles.contentInfo}>
          <span className={styles.title}>
            Shipping Method
            <br />
          </span>
          <span className={styles.details}>
            CA$‌7.95 <br />
            3-4 Business Day Shipping - Free on orders CA$‌74.00+
            <br />
          </span>
          <Link to={''} className={styles.link}>
            Track Package
          </Link>
        </div>

        <div className={styles.contentInfo}>
          <span className={styles.title}>
            Payment Method
            <br />
          </span>
          <span className={styles.details}>Visa — 6967</span>
        </div>
      </div>
      <div className={styles.productInfo}>
        {/* TODO: Uncomment after OrderImage is merged
        <OrderImage image={image} /> */}
        <div className={styles.productDetails}>
          <ProductTitle size="md">
            Fleece Quarter Zip (Dazed and Amused)
            <span>
              <br />L
            </span>
          </ProductTitle>
          <Price size="md" amount="53.0" bold={true} />
        </div>
      </div>
      <div className={styles.productCost}>
        <div>
          <span className={styles.textBoldMd}>Subtotal</span>
          <Price size="md" amount="53.00" />
        </div>
        <div>
          <span className={styles.textBoldMd}>Taxes</span>
          <Price size="md" amount="5.95" />
        </div>
        <div>
          <span className={styles.textBoldMd}>Shipping</span>
          <Price size="md" amount="7.95" />
        </div>
        <div className={styles.total}>
          <span className={styles.textBoldMd}>Total</span>
          <Price size="md" amount="66.00" />
        </div>
      </div>
    </div>
  )
}

export default AccountOrderDetails
