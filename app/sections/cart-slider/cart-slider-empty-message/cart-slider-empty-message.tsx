import { Link } from '@remix-run/react'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import styles from './styles.module.css'

const CartSliderEmptyMessage = () => (
  <div className={styles.content}>
    <div className={styles.text}>
      {/* TO-DO: Not sure if this emoji is text or svg? */}
      <p>👀</p>
      <h1 className={styles.title}>Your Cart is Empty</h1>
      <p className={styles.description}>Looks like you haven&apos;t added any products.</p>
    </div>
    <Link to="/">
      <Button variant="primary" size="sm" className={styles.button}>
        View Deals
      </Button>
    </Link>
  </div>
)

export default CartSliderEmptyMessage
