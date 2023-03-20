//This is the format that we have requested from Searchspring
export type SearchspringResponse = {
  pagination?: {
    totalResults: number
    begin: number
    end: number
    currentPage: number
    totalPages: number
    previousPage: number
    nextPage: number
    perPage: number
    defaultPerPage: number
  }
  sorting?: {
    options: {
      field: string
      direction: string
      label: string
    }[]
  }
  resultLayout?: string
  results: SearchSpringProduct[]
  facets?: SearchSpringFacet[]
  breadcrumbs?: string[]
  filterSummary?: string[]
  merchandising?: {
    redirect: string
    is_elevated: string[]
    elevated: string[]
    removed: string[]
    content: {
      inline: {
        value: string
        config: {
          position: {
            index: number
          }
        }
      }[]
    }
    facets: string[]
    facetsHide: string[]
    experiments: string[]
    variants: string[]
    personalized: boolean
    triggeredCampaigns: {
      id: string
      title: string
      type: string
    }[]
  }
}

export type SearchSpringFacet = {
  field: string
  label: string
  type: string
  collapse: number
  step?: number
  facet_active: number
  active?: number[]
  range?: number[]
  values:
    | {
        active: boolean
        type: string
        value: object | string | null
        label: string
        count: number
      }[]
    | null
}

export type SearchSpringProduct = {
  brand: string
  id: string
  imageUrl: string
  intellisuggestData: string
  intellisuggestSignature: string
  name: string
  price: string
  product_type_unigram: string
  sku: string
  thumbnailImageUrl: string
  uid: string
  ss_product_group?: string
  ss_swatch?: string
  ss_inseam_length?: number
  ss_product_id?: string
  url: string
}
