import { HTMLAttributes } from 'react'
import { PdpProduct } from '~/global-types'

export type ProductBoxProps = HTMLAttributes<HTMLElement> & { product: PdpProduct }
