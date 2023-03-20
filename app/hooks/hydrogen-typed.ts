import { useRouteLoaderData } from '@remix-run/react'

export const useTypedRouteLoaderData = <T>(routeId: string) =>
  useRouteLoaderData(routeId) as T | undefined
