import { HTMLAttributes } from 'react'

import { FooterData } from '~/global-types'

export type FooterProps = HTMLAttributes<HTMLElement> & {
  data?: FooterData
}
