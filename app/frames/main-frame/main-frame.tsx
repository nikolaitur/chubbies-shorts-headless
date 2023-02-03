import { forwardRef, HTMLAttributes, ReactNode, Ref } from 'react'

export type MainFrameProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

const MainFrame = ({ children, ...props }: MainFrameProps, ref: Ref<HTMLDivElement>) => {
  return (
    <main ref={ref} {...props}>
      <header>Header</header>
      {children}
      <footer>Footer</footer>
    </main>
  )
}

export default forwardRef(MainFrame)
