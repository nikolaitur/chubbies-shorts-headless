import NotifyModal from '../notify-modal'
import { WaitlistModalProps } from './types'

const WaitlistModal = ({ onClose }: WaitlistModalProps) => {
  // TODO: Logic for waitlist

  return (
    <NotifyModal
      action="/api/product/release"
      heading="I want this"
      text="Lemme know when I can have these bad boys, and gimme access to related exclusive email
          launches."
      submitButtonText="Keep Me Posted"
      onClose={onClose}
    />
  )
}

export default WaitlistModal
