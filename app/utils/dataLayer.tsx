/* eslint-disable no-console */
//TODO: emit errors to sentry once implemented
import { validate } from 'jsonschema'
import TagManager from 'react-gtm-module'
import {
  addToCartSchema,
  removeFromCartSchema,
  viewCartSchema,
  viewItemListSchema,
  viewItemSchema,
} from '~/data/schemas/dataLayer'
export const dataLayerATC = ({ ecommerce }: { ecommerce: object }) => {
  const analyticsData = {
    event: 'add_to_cart',
    data: {
      add_to_cart: {
        ...ecommerce,
      },
    },
  }

  const validateRes = validate(analyticsData.data, addToCartSchema)

  if (validateRes?.valid) {
    TagManager.dataLayer({
      dataLayer: analyticsData,
    })
  } else {
    console.log(validateRes?.errors)
  }
}

export const dataLayerViewItem = ({ ecommerce }: { ecommerce: object }) => {
  const analyticsData = {
    event: 'view_item',
    data: {
      view_item: {
        ...ecommerce,
      },
    },
  }

  const validateRes = validate(analyticsData.data, viewItemSchema)

  if (validateRes?.valid) {
    TagManager.dataLayer({
      dataLayer: analyticsData,
    })
  } else {
    console.log(validateRes?.errors)
  }
}

export const dataLayerViewItemList = ({ ecommerce }: { ecommerce: object }) => {
  const analyticsData = {
    event: 'view_item_list',
    data: {
      view_item_list: {
        ...ecommerce,
      },
    },
  }

  const validateRes = validate(analyticsData.data, viewItemListSchema)

  if (validateRes?.valid) {
    TagManager.dataLayer({
      dataLayer: analyticsData,
    })
  } else {
    console.log(validateRes?.errors)
  }
}

export const dataLayerViewCart = ({ ecommerce }: { ecommerce: object }) => {
  const analyticsData = {
    event: 'view_cart',
    data: {
      view_cart: {
        ...ecommerce,
      },
    },
  }

  const validateRes = validate(analyticsData.data, viewCartSchema)

  if (validateRes?.valid) {
    TagManager.dataLayer({
      dataLayer: analyticsData,
    })
  } else {
    console.log(validateRes?.errors)
  }
}

export const dataLayerRemoveFromCart = ({ ecommerce }: { ecommerce: object }) => {
  const analyticsData = {
    event: 'remove_from_cart',
    data: {
      remove_from_cart: {
        ...ecommerce,
      },
    },
  }

  const validateRes = validate(analyticsData.data, removeFromCartSchema)

  if (validateRes?.valid) {
    TagManager.dataLayer({
      dataLayer: analyticsData,
    })
  } else {
    console.log(validateRes?.errors)
  }
}
