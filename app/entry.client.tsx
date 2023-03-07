import { builder, Builder } from '@builder.io/react'
import { RemixBrowser } from '@remix-run/react'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import builderConfig from '../builderConfig.json'
import HeroBanner from './sections/hero-banner/hero-banner'
import MediaBanner from './sections/media-banner/media-banner'

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

Builder.registerComponent(MediaBanner, {
  name: 'MediaBanner',
  inputs: [
    {
      name: 'mediaItems',
      type: 'list',
      subFields: [
        {
          name: 'image',
          type: 'file',
          friendlyName: 'Media Image',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'svg'],
          required: true,
        },
        {
          name: 'heading',
          friendlyName: 'Heading Text',
          type: 'text',
        },
        {
          name: 'link_text',
          friendlyName: 'Link Text',
          type: 'text',
        },
        {
          name: 'link_url',
          friendlyName: 'Link Url',
          type: 'url',
        },
      ],
    },
  ],
})
//TODO: Remove document.getElementById('root')! when Xiphe/remix-island is no longer needed (facebook/react#24430)
hydrateRoot(
  document.getElementById('root')!,
  <StrictMode>
    <RemixBrowser />
  </StrictMode>,
)
