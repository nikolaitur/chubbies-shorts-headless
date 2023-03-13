import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { PortalProps } from './types'

const Portal = ({ children, ...props }: PortalProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    return () => setIsMounted(false)
  }, [])

  return isMounted
    ? createPortal(<div {...props}>{children}</div>, document.getElementById('portal')!)
    : null
}

export default Portal
