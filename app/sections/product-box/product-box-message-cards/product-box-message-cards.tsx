import MessagingCampaign from '~/components/messaging-campaign'
import { ROUTE_IDS } from '~/constants'
import { LoaderData } from '~/global-types'
import { useMessagingCampaigns } from '~/helpers'
import { useTypedRouteLoaderData } from '~/hooks'
import styles from './styles.module.css'
import { ProductBoxMessageCardsProps } from './types'

const ProductBoxMessageCards = (props: ProductBoxMessageCardsProps) => {
  const { outOfStockMessaging } =
    useTypedRouteLoaderData<LoaderData['frame']>(ROUTE_IDS.FRAME) ?? {}
  const { product } = useTypedRouteLoaderData<LoaderData['product']>(ROUTE_IDS.PRODUCT) ?? {}
  const { selectedVariant, tags } = product ?? {}
  const campaignsToDisplay = useMessagingCampaigns(tags)

  const isOutOfStock = !(selectedVariant?.availableForSale ?? true)

  if (!isOutOfStock && !campaignsToDisplay) return null

  return (
    <div className={styles.wrapper} {...props}>
      {isOutOfStock && outOfStockMessaging?.reference && (
        <MessagingCampaign
          type="product-page"
          messageCardVariant="critical"
          campaign={outOfStockMessaging?.reference}
        />
      )}

      {campaignsToDisplay?.map((campaign, index) => (
        <MessagingCampaign key={index} type="product-page" campaign={campaign} />
      ))}
    </div>
  )
}

export default ProductBoxMessageCards
