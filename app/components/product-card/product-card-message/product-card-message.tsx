import MessagingCampaign from '~/components/messaging-campaign'
import { useMessagingCampaigns } from '~/helpers'
import styles from './styles.module.css'
import { ProductCardMessageProps } from './types'

const ProductCardMessage = ({ tags, ...props }: ProductCardMessageProps) => {
  const campaignsToDisplay = useMessagingCampaigns(tags)

  if (campaignsToDisplay.length < 1) return null

  return (
    <div className={styles.wrapper} {...props}>
      {campaignsToDisplay.map((campaign, index) => (
        <MessagingCampaign key={index} type="product-card" campaign={campaign} />
      ))}
    </div>
  )
}

export default ProductCardMessage
