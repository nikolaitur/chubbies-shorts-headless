import { HTMLAttributes, useMemo } from 'react'
import { Link, LinkProps } from '@remix-run/react'

const SHOPIFY_DOMAIN = 'chubbies.myshopify.com'

const InternalLink = ({
  to,
  children,
  ...props
}: { to?: string } & LinkProps & HTMLAttributes<HTMLElement>) => {
  const internalLink = useMemo(() => {
    const isMyShopify = to?.includes(SHOPIFY_DOMAIN)

    if (isMyShopify) {
      return to?.split(SHOPIFY_DOMAIN)?.[1]
    }

    return to
  }, [to])

  return internalLink ? (
    <Link to={internalLink} {...props}>
      {children}
    </Link>
  ) : (
    <div {...props}>{children}</div>
  )
}

export default InternalLink
