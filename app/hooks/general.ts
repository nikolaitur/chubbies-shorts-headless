import { useEffect, useState } from 'react'

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
  }, [])

  return isMatch
}
