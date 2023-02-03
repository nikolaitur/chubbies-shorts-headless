import { SampleProps } from './types'

const Sample = ({ ...props }: SampleProps) => {
  return <div {...props}>Sample</div>
}

export default Sample
