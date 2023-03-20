import { useFetchers } from '@remix-run/react'
import { RefObject, useEffect, useState } from 'react'
import { checkIfTouchDevice } from '~/helpers'

export const useMatchMedia = (breakpoint: string, initialValue = false) => {
  const [isMatch, setIsMatch] = useState(initialValue)

  useEffect(() => {
    const media = window?.matchMedia(breakpoint)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMatch(e.matches)
    }

    // set isMatch value on first load
    setIsMatch(media?.matches)

    // set isMatch value on change
    media.onchange = e => handleChange(e)
  }, [breakpoint])

  return isMatch
}

export function useCartFetchers(actionNames: string[]) {
  const fetchers = useFetchers()
  const cartFetchers = []

  for (const fetcher of fetchers) {
    const formData = fetcher.submission?.formData

    const currentCartAction = formData?.get('cartAction') as string

    if (formData && actionNames.includes(currentCartAction)) {
      cartFetchers.push(fetcher)
    }
  }
  return cartFetchers
}

export type OverlayControllerOptions = {
  hoverControllerRef?: RefObject<HTMLElement> | null
  openControllerRef?: RefObject<HTMLElement> | null
  closeControllerRef?: RefObject<HTMLElement> | null
  toggleControllerRef?: RefObject<HTMLElement> | null
}

export const useOverlayController = (
  options: OverlayControllerOptions,
  dependencies: any[] = [],
) => {
  const [isShown, setIsShown] = useState(false)

  const showOverlay = () => {
    setIsShown(true)
  }

  const hideOverlay = () => {
    setIsShown(false)
  }

  const toggleOverlay = () => {
    setIsShown(!isShown)
  }

  useEffect(() => {
    const { hoverControllerRef, openControllerRef, closeControllerRef, toggleControllerRef } =
      options
    const openController = openControllerRef?.current
    const hoverController = hoverControllerRef?.current
    const toggleController = toggleControllerRef?.current
    const closeController = closeControllerRef?.current
    const isTouchDevice = checkIfTouchDevice()

    if (!isTouchDevice) {
      hoverController?.addEventListener('mouseenter', showOverlay)
      hoverController?.addEventListener('mouseleave', hideOverlay)
    }
    openController?.addEventListener('click', showOverlay)
    closeController?.addEventListener('click', hideOverlay)
    toggleController?.addEventListener('click', toggleOverlay)

    return () => {
      if (!isTouchDevice) {
        hoverController?.removeEventListener('mouseenter', showOverlay)
        hoverController?.removeEventListener('mouseleave', hideOverlay)
      }

      openController?.removeEventListener('click', showOverlay)
      closeController?.removeEventListener('click', hideOverlay)
      toggleController?.removeEventListener('click', toggleOverlay)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies])

  return { isShown, showOverlay, hideOverlay, toggleOverlay }
}

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}

export const useYotpoBottomline = (productId?: string) => {
  const [reviews, setReviews] = useState<{ averageScore: number; totalReviews: number } | null>(
    null,
  )
  const appId = 'wokUWszpyYRe1oBhrtdV6mU4xPuHYSXJz57szBwQ'
  const legacyProductId = productId && productId.replace('gid://shopify/Product/', '')
  useEffect(() => {
    if (legacyProductId) {
      fetch(`https://api.yotpo.com/products/${appId}/${legacyProductId}/bottomline`)
        .then((response): Promise<YotpoBottomlineResponse> => response.json())
        .then(data => {
          const { average_score, total_reviews } = data?.response?.bottomline || {}
          if (average_score && total_reviews) {
            setReviews(prev => ({
              ...prev,
              averageScore: average_score,
              totalReviews: total_reviews,
            }))
          }
        })
    }
  }, [legacyProductId])
  return {
    averageScore: reviews?.averageScore || 0,
    totalReviews: reviews?.totalReviews || 0,
  }
}

export type YotpoBottomlineResponse = {
  status: {
    code: number
    message: string
  }
  response: {
    bottomline: {
      average_score: number
      total_reviews: number
    }
  }
}
