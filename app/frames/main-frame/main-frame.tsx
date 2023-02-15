import { forwardRef, HTMLAttributes, ReactNode, Ref } from 'react'
import Header from '~/sections/header'

export type MainFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

const MainFrame = ({ children, ...props }: MainFrameProps, ref: Ref<HTMLDivElement>) => {
  return (
    <main ref={ref} {...props}>
      <Header />
      {children}
      <footer>Footer</footer>
    </main>
  )
}

export default forwardRef(MainFrame)
