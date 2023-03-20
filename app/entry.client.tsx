import { builder, Builder } from '@builder.io/react'
import { RemixBrowser } from '@remix-run/react'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import builderConfig from '../builderConfig.json'
import HeroBanner from './sections/hero-banner/hero-banner'
import MediaBanner from './sections/media-banner/media-banner'
import SocialMediaPosts from './sections/social-media-posts/social-media-posts'

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
          name: 'linkText',
          friendlyName: 'Link Text',
          type: 'text',
        },
        {
          name: 'linkUrl',
          friendlyName: 'Link Url',
          type: 'url',
        },
      ],
    },
  ],
})

Builder.registerComponent(SocialMediaPosts, {
  name: 'SocialMediaPosts',
  inputs: [
    {
      name: 'heading',
      friendlyName: 'Heading Text',
      type: 'text',
      defaultValue: '#ChubbiesInTheWild',
    },
    {
      name: 'description',
      friendlyName: 'Description Text',
      type: 'longText',
      defaultValue:
        'Show us what you’re up to! Tag & mention @Chubbies on your Instagram post to be featured here.',
    },
    {
      name: 'nostoHtml',
      friendlyName: 'HTML',
      type: 'longText',
      defaultValue: '<div class="nosto_element" id="homepage-tab-3"></div>',
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
