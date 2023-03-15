import { useMatches } from '@remix-run/react'

export function useAnalyticsFromLoaders(dataKey = 'analytics'): Record<string, unknown> {
  const matches = useMatches()
  const data: Record<string, unknown> = {}

  matches.forEach(event => {
    const eventData = event?.data as Record<string, unknown>
    if (eventData && eventData[dataKey]) {
      Object.assign(data, eventData[dataKey])
    }
  })

  return data
}
