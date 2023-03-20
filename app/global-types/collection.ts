export type Facets = Facet[]

export type Facet = {
  collapse: boolean
  facet_active: boolean
  field: string
  label: string
  multiply: string
  type: string
  values?: Array<any>
  range?: number[]
  active?: number[]
}
