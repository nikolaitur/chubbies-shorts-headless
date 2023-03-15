import { Link as RemixLink, useMatches, type LinkProps as RemixLinkProps } from '@remix-run/react'
import { forwardRef, Ref } from 'react'

export type LinkProps = Omit<RemixLinkProps, 'className'> & {
  className?: RemixLinkProps['className']
}

const SHOPIFY_DOMAIN = 'chubbies.myshopify.com'

/**
 * In our app, we've chosen to wrap Remix's `Link` component to add
 * helper functionality. If the `to` value is a string (not object syntax),
 * we first check to see if the link contains a myshopify.com url,
 * when it does, we remove it and treat it as a local link.
 *
 * Afterward, we prefix the locale to the path if there is one.
 *
 * Likewise, your internationalization strategy may not require a locale
 * in the pathname and instead rely on a domain, cookie, or header.
 */

const Link = (props: LinkProps, ref: Ref<HTMLAnchorElement>) => {
  const { to, className, ...resOfProps } = props
  const [root] = useMatches()
  const { pathPrefix = '' } = root.data?.selectedLocale || {}
  const absoluteUrl = new RegExp('^(?:[a-z+]+:)?//', 'i')
  let transformedTo
  if (typeof to === 'object') {
    const { pathname = '' } = to
    transformedTo = { ...to, pathname: prefixPathname({ pathname, pathPrefix }) }
  } else {
    const isMyShopify = to?.includes(SHOPIFY_DOMAIN)
    if (isMyShopify) {
      const transformedRelative = to.split(SHOPIFY_DOMAIN)?.[1]
      transformedTo = prefixPathname({ pathname: transformedRelative, pathPrefix })
    } else if (!absoluteUrl.test(to)) {
      transformedTo = prefixPathname({ pathname: to, pathPrefix })
    } else {
      transformedTo = to
    }
  }
  return <RemixLink to={transformedTo} className={className} ref={ref} {...resOfProps} />
}

export default forwardRef(Link)

const prefixPathname = ({ pathname, pathPrefix }: { pathname: string; pathPrefix: string }) => {
  if (pathPrefix && !pathname?.startsWith(pathPrefix)) return `${pathPrefix}${pathname}`
  if (pathPrefix && pathname?.startsWith(pathPrefix)) return pathname
  return pathname
}
