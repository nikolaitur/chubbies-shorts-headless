export const viewItemListSchema = {
  type: 'object',
  title: 'View Item List',
  required: ['view_item_list'],
  properties: {
    view_item_list: {
      type: 'object',
      required: ['ecommerce'],
      properties: {
        ecommerce: {
          type: 'object',
          required: ['currency', 'items'],
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                required: ['item_id', 'item_name'],
                properties: {
                  index: {
                    type: 'integer',
                    description: 'The index/position of the item in a list',
                  },
                  price: {
                    type: 'number',
                    description:
                      'The monetary price of the item, in units of the specified currency parameter',
                  },
                  item_id: {
                    type: 'string',
                    description: 'The ID of the item',
                  },
                  quantity: {
                    type: 'integer',
                    description: 'Item quantity',
                  },
                  item_name: {
                    type: 'string',
                    description: 'The name of the item',
                  },
                  item_brand: {
                    type: 'string',
                    description: 'The brand of the item',
                  },
                  item_list_id: {
                    type: 'string',
                    description: 'The ID of the list in which the item was presented to the user',
                  },
                  item_variant: {
                    type: 'string',
                    description: 'The item variant or unique code',
                  },
                  item_category: {
                    type: 'string',
                    description: 'The category of the item',
                  },
                  item_list_name: {
                    type: 'string',
                    description: 'The name of the list in which the item was presented to the user',
                  },
                },
              },
              description: 'Array of items in cart during checkout',
            },
            currency: {
              type: 'string',
              description:
                'Currency of the items associated with the event, in 3-letter ISO 4217 format',
            },
          },
        },
      },
    },
  },
  description: 'A user is presented with a list of items',
}

export const viewItemSchema = {
  type: 'object',
  title: 'View Item',
  required: ['view_item'],
  properties: {
    view_item: {
      type: 'object',
      required: ['ecommerce'],
      properties: {
        ecommerce: {
          type: 'object',
          required: ['currency', 'items'],
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                required: ['item_id', 'item_name'],
                properties: {
                  price: {
                    type: 'number',
                    description:
                      'The monetary price of the item, in units of the specified currency parameter',
                  },
                  item_id: {
                    type: 'string',
                    description: 'The ID of the item',
                  },
                  quantity: {
                    type: 'integer',
                    description: 'Item quantity',
                  },
                  item_name: {
                    type: 'string',
                    description: 'The name of the item',
                  },
                  item_brand: {
                    type: 'string',
                    description: 'The brand of the item',
                  },
                  item_variant: {
                    type: 'string',
                    description: 'The item variant or unique code',
                  },
                  item_category: {
                    type: 'string',
                    description: 'The category of the item',
                  },
                },
              },
              description: 'Array of items in cart during checkout',
            },
            currency: {
              type: 'string',
              description:
                'Currency of the items associated with the event, in 3-letter ISO 4217 format',
            },
          },
        },
      },
    },
  },
  description: 'User viewed a product detail page',
}

export const addToCartSchema = {
  type: 'object',
  title: '"Add to Cart',
  required: ['add_to_cart'],
  properties: {
    add_to_cart: {
      type: 'object',
      required: ['ecommerce'],
      properties: {
        ecommerce: {
          type: 'object',
          required: ['currency', 'items'],
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                required: ['item_id', 'item_name'],
                properties: {
                  price: {
                    type: 'number',
                    description:
                      'The monetary price of the item, in units of the specified currency parameter',
                  },
                  item_id: {
                    type: 'string',
                    description: 'The ID of the item',
                  },
                  quantity: {
                    type: 'integer',
                    description: 'Item quantity',
                  },
                  item_name: {
                    type: 'string',
                    description: 'The name of the item',
                  },
                  item_brand: {
                    type: 'string',
                    description: 'The brand of the item',
                  },
                  item_variant: {
                    type: 'string',
                    description: 'The item variant or unique code',
                  },
                  item_category: {
                    type: 'string',
                    description: 'The category of the item',
                  },
                },
              },
              description: 'Array of items in cart during checkout',
            },
            currency: {
              type: 'string',
              description:
                'Currency of the items associated with the event, in 3-letter ISO 4217 format',
            },
          },
        },
      },
    },
  },
  description: 'An item is added to the shopping cart',
}

export const viewCartSchema = {
  type: 'object',
  title: 'View Cart',
  required: ['view_cart'],
  properties: {
    view_cart: {
      type: 'object',
      required: ['ecommerce'],
      properties: {
        ecommerce: {
          type: 'object',
          required: ['currency', 'items'],
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                required: ['item_id', 'item_name'],
                properties: {
                  price: {
                    type: 'number',
                    description:
                      'The monetary price of the item, in units of the specified currency parameter',
                  },
                  item_id: {
                    type: 'string',
                    description: 'The ID of the item',
                  },
                  quantity: {
                    type: 'integer',
                    description: 'Item quantity',
                  },
                  item_name: {
                    type: 'string',
                    description: 'The name of the item',
                  },
                  item_brand: {
                    type: 'string',
                    description: 'The brand of the item',
                  },
                  item_variant: {
                    type: 'string',
                    description: 'The item variant or unique code',
                  },
                },
              },
              description: 'Array of items in cart during checkout',
            },
            currency: {
              type: 'string',
              description:
                'Currency of the items associated with the event, in 3-letter ISO 4217 format',
            },
            view_cart_type: {
              type: 'string',
              description:
                'The method user used to view their cart. Options are Cart Page or Cart Preview',
            },
          },
        },
      },
    },
  },
  description: 'User viewed their cart',
}

export const removeFromCartSchema = {
  title: 'Remove from Cart',
  description: 'An item was removed from the shopping cart',
  type: 'object',
  required: ['remove_from_cart'],
  properties: {
    remove_from_cart: {
      type: 'object',
      required: ['ecommerce'],
      properties: {
        ecommerce: {
          type: 'object',
          required: ['currency', 'items'],
          properties: {
            currency: {
              type: 'string',
              description:
                'Currency of the items associated with the event, in 3-letter ISO 4217 format',
            },
            items: {
              description: 'Array of items in cart during checkout',
              type: 'array',
              items: {
                type: 'object',
                required: ['item_id', 'item_name'],
                properties: {
                  item_id: {
                    type: 'string',
                    description: 'The ID of the item',
                  },
                  item_name: {
                    type: 'string',
                    description: 'The name of the item',
                  },
                  item_brand: {
                    type: 'string',
                    description: 'The brand of the item',
                  },

                  item_category: {
                    type: 'string',
                    description: 'The category of the item',
                  },
                  item_variant: {
                    type: 'string',
                    description: 'The item variant or unique code',
                  },
                  price: {
                    type: 'number',
                    description:
                      'The monetary price of the item, in units of the specified currency parameter',
                  },
                  quantity: {
                    type: 'integer',
                    description: 'Item quantity',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
}
