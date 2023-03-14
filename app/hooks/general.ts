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

export type OverlayControllerOptions = {
  className: string
  overlayRef: RefObject<HTMLElement>
  hoverControllerRef?: RefObject<HTMLElement> | null
  toggleControllerRef?: RefObject<HTMLElement> | null
  closeControllerRef?: RefObject<HTMLElement> | null
}

export const useOverlayController = (options: OverlayControllerOptions) => {
  useEffect(() => {
    const { className, overlayRef, hoverControllerRef, closeControllerRef, toggleControllerRef } =
      options

    const hoverController = hoverControllerRef?.current
    const toggleController = toggleControllerRef?.current
    const closeController = closeControllerRef?.current
    const overlay = overlayRef.current
    const isTouchDevice = checkIfTouchDevice()

    if (!overlay) return

    const showOverlay = () => {
      overlay.classList.add(className)
    }

    const hideOverlay = () => {
      overlay.classList.remove(className)
    }

    const toggleOverlay = () => {
      overlay.classList.toggle(className)
    }

    if (!isTouchDevice) {
      hoverController?.addEventListener('mouseenter', showOverlay)
      hoverController?.addEventListener('mouseleave', hideOverlay)
    }
    toggleController?.addEventListener('click', toggleOverlay)
    closeController?.addEventListener('click', hideOverlay)

    return () => {
      if (!isTouchDevice) {
        hoverController?.removeEventListener('mouseenter', showOverlay)
        hoverController?.removeEventListener('mouseleave', hideOverlay)
      }

      toggleController?.removeEventListener('click', toggleOverlay)
      closeController?.removeEventListener('click', hideOverlay)
    }
  }, [])
}
