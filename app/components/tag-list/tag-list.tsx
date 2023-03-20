import { useMessagingCampaigns } from '~/helpers'
import MessagingCampaign from '../messaging-campaign'
import styles from './styles.module.css'
import { TagListProps } from './types'

const TagList = ({ tags, ...props }: TagListProps) => {
  const campaignsToDisplay = useMessagingCampaigns(tags)

  if (campaignsToDisplay.length < 1) return null

  return (
    <ul className={styles.wrapper} {...props}>
      {campaignsToDisplay?.map((campaign, index) => (
        <li key={index}>
          <MessagingCampaign type="product-tag" key={index} campaign={campaign} />
        </li>
      ))}
    </ul>
  )
}

export default TagList
