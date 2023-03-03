import NotifyModal from '../notify-modal'
import { OutOfStockModalProps } from './types'

const OutOfStockModal = ({ onClose }: OutOfStockModalProps) => {
  // TODO: Logic for OOS restock

  return (
    <NotifyModal
      action="/api/product/restock"
      heading="Keep Me Posted"
      text="Lemme know when these bad boys are back in stock, and gimme access to related exclusive email launches."
      submitButtonText="Remind Me Later"
      onClose={onClose}
    />
  )
}

export default OutOfStockModal
