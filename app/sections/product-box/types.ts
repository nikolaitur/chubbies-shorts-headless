import { HTMLAttributes } from 'react'
import { PdpQuery } from '~/graphql/generated'

export type ProductBoxProps = HTMLAttributes<HTMLElement> & { product: PdpQuery['product'] }
