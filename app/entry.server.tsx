import { RemixServer } from '@remix-run/react'
import type { EntryContext } from '@shopify/remix-oxygen'
import { renderToReadableStream } from 'react-dom/server'
import { renderHeadToString } from 'remix-island'
import { Head } from './root'

//TODO: Remove head manipulation when Xiphe/remix-island is no longer needed (facebook/react#24430)
const readableString = (value: string) => {
  const te = new TextEncoder()
  return new ReadableStream({
    start(controller) {
      controller.enqueue(te.encode(value))
      controller.close()
    },
  })
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const { readable, writable } = new TransformStream()
  const head = readableString(
    `<!DOCTYPE html><html><head>${renderHeadToString({
      request,
      remixContext,
      Head,
    })}</head><body><div id="root">`,
  )
  const end = readableString(`</div></body></html>`)

  const body = await renderToReadableStream(
    <RemixServer context={remixContext} url={request.url} />,
  )

  Promise.resolve()
    .then(() => head.pipeTo(writable, { preventClose: true }))
    .then(() => body.pipeTo(writable, { preventClose: true }))
    .then(() => end.pipeTo(writable))

  responseHeaders.set('Content-Type', 'text/html')

  return new Response(readable, {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
