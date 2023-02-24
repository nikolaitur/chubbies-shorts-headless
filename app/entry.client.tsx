import { builder, Builder } from '@builder.io/react'
import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import builderConfig from '../builderConfig.json'
import HeroBanner from './sections/hero-banner'

builder.init(builderConfig.apiKey)

Builder.registerComponent(HeroBanner, {
  name: 'HeroBanner',
  inputs: [
    {
      name: 'bgImg',
      friendlyName: 'Background Image',
      type: 'file',
      allowedFileTypes: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'],
    },
    {
      name: 'plxImg',
      friendlyName: 'Parallax Image',
      type: 'file',
      allowedFileTypes: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'],
    },
    {
      name: 'contentPosition',
      friendlyName: 'Content Position',
      type: 'text',
      enum: ['center', 'right', 'left'],
      defaultValue: 'center',
    },
    {
      name: 'effectSetting',
      friendlyName: 'Effect Setting',
      type: 'text',
      enum: ['scale', 'bgFixed', 'imgFixed'],
      defaultValue: 'scale',
    },
    {
      name: 'heading',
      friendlyName: 'Heading Text',
      type: 'text',
      defaultValue: 'THE BEST OF THE BEST',
    },
    {
      name: 'description',
      friendlyName: 'Heading Text',
      type: 'text',
      defaultValue: 'SHOP OUR MOST POPULAR STYLES',
    },
    {
      name: 'buttonText',
      friendlyName: 'Button Text',
      type: 'text',
      defaultValue: 'SHOP NOW',
    },
  ],
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
