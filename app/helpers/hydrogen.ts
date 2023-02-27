import { useLocation, useMatches } from '@remix-run/react'
import { countries } from '~/data/countries'
import { I18nLocale } from '~/global-types'

export const DEFAULT_LOCALE: I18nLocale = Object.freeze({
  ...countries.default,
  pathPrefix: '',
})

export function getLocaleFromRequest(request: Request): I18nLocale {
  const url = new URL(request.url)
  const firstPathPart = '/' + url.pathname.substring(1).split('/')[0].toLowerCase()

  return countries[firstPathPart]
    ? {
        ...countries[firstPathPart],
        pathPrefix: firstPathPart,
      }
    : {
        ...countries['default'],
        pathPrefix: '',
      }
}

export function usePrefixPathWithLocale(path: string) {
  const [root] = useMatches()
  const selectedLocale = root.data?.selectedLocale ?? DEFAULT_LOCALE

  return `${selectedLocale.pathPrefix}${path.startsWith('/') ? path : '/' + path}`
}

export function useIsHomePath() {
  const { pathname } = useLocation()
  const [root] = useMatches()
  const selectedLocale = root.data?.selectedLocale ?? DEFAULT_LOCALE
  const strippedPathname = pathname.replace(selectedLocale.pathPrefix, '')
  return strippedPathname === '/'
}

/**
 * Validates that a url is local
 * @param url
 * @returns `true` if local `false`if external domain
 */
export function isLocalPath(url: string) {
  try {
    // We don't want to redirect cross domain,
    // doing so could create fishing vulnerability
    // If `new URL()` succeeds, it's a fully qualified
    // url which is cross domain. If it fails, it's just
    // a path, which will be the current domain.
    new URL(url)
  } catch (e) {
    return true
  }

  return false
}
