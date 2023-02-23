import { forwardRef, HTMLAttributes, ReactNode, Ref } from 'react'
import CartSlider from '~/sections/cart-slider'
import Header from '~/sections/header'
import Footer from '~/sections/footer'

import { FooterData } from '~/global-types'

export type MainFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  layout: { footer?: FooterData }
}

const MainFrame = ({ children, layout, ...props }: MainFrameProps, ref: Ref<HTMLDivElement>) => {
  return (
    <main ref={ref} {...props}>
      <Header />
      {children}
      <Footer data={layout.footer} />
      <CartSlider />
    </main>
  )
}

export default forwardRef(MainFrame)
