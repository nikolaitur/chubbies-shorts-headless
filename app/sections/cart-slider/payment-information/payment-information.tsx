import { LockIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import PaymentMethod from '@solo-brands/ui-library.ui.atomic.payment-method'
import { forwardRef, HTMLAttributes, Ref } from 'react'
import styles from './styles.module.css'

export type PaymentInformationProps = HTMLAttributes<HTMLDivElement>

const PaymentInformation = ({ ...props }: PaymentInformationProps, ref: Ref<HTMLDivElement>) => {
  // TO-DO: Restructure logic here

  return (
    <div className={styles.paymentInformation} ref={ref} {...props}>
      <div className={styles.title}>
        <LockIcon size="xs" />
        <p>100% Secure Payment</p>
      </div>
      <div className={styles.methods}>
        <PaymentMethod variant="amex" size="md" />
        <PaymentMethod variant="mastercard" size="md" />
        <PaymentMethod variant="visa" size="md" />
        <PaymentMethod variant="pay-pal" size="md" />
      </div>
      <div className={styles.exchange}>
        <LockIcon size="xs" />
        <p>Free return and exchange within 90 days</p>
      </div>
    </div>
  )
}

export default forwardRef(PaymentInformation)
