import { HTMLAttributes } from 'react'
import { InseamVariantsGroupProps } from '~/components/inseam-variants-group'

export type ProductBoxInseamVariantsGroupProps = HTMLAttributes<HTMLDivElement> &
  Pick<InseamVariantsGroupProps, 'size'>
