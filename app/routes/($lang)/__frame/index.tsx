import { builder, BuilderComponent, useIsPreviewing } from '@builder.io/react'
import type { BuilderContent } from '@builder.io/sdk'
import { useLoaderData } from '@remix-run/react'
import { LoaderArgs } from '@shopify/remix-oxygen'
import builderConfig from '../../../../builderConfig.json'

builder.init(builderConfig.apiKey)
const pageModel = 'homepage'

export async function loader({ params }: LoaderArgs) {
  const page = await builder
    .get(pageModel, {
      options: { includeUnpublished: true },
      userAttributes: {
        urlPath: `/`,
      },
    })
    .toPromise()

  if (page) return page

  return {}
}

// this gives full compatibility to BuilderContent type and Remix starter
// See: https://github.com/BuilderIO/builder/issues/1387#issuecomment-1397442797
type BuilderContentRemix = Omit<BuilderContent, 'variations' | 'data'>

export default function Page() {
  const page: BuilderContentRemix = useLoaderData<BuilderContentRemix>()
  const isPreviewingInBuilder = useIsPreviewing()
  const show404 = !page && !isPreviewingInBuilder

  if (show404) {
    return <h1>404 not found (customize your 404 here)</h1>
  }

  return (
    <div>
      <BuilderComponent model={pageModel} content={page} />
    </div>
  )
}
