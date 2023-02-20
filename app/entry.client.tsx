import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { builder, Builder } from '@builder.io/react'
import builderConfig from '../builderConfig.json'
import SectionText from './components/section/Text/SectionText'

builder.init(builderConfig.apiKey)

Builder.registerComponent(SectionText, {
  name: 'SectionText',
  inputs: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'text' },
  ],
  image: 'https://tabler-icons.io/static/tabler-icons/icons-png/3d-cube-sphere-off.png',
})

function hydrate() {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    )
  })
}

if (typeof requestIdleCallback === 'function') {
  requestIdleCallback(hydrate)
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1)
}
