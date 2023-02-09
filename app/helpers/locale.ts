import { useMatches } from '@remix-run/react'

import { countries } from '~/data'
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
