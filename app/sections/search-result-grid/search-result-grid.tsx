import { RouteMatch, useMatches, useSearchParams } from '@remix-run/react'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import { FilterIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import React from 'react'
import CollectionFilters from '~/components/collection-filters'
import CollectionPageTitle from '~/components/collection-page-title'
import Container from '~/components/container'
import ProductCard from '~/components/product-card'
import Section from '~/components/section'
import { SEARCH_ROUTE_ID } from '~/constants'
import styles from './styles.module.css'
import { SearchResultGridProps } from './types'

const SearchResultGrid = ({ products }: SearchResultGridProps) => {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q')
  const searchTitle = `Results for "${q}"`

  const matches = useMatches()
  const searchMatch = matches.find(match => match.id === SEARCH_ROUTE_ID) as RouteMatch
  const { productGroups, facets } = searchMatch?.data || {}

  return (
    <Section>
      <Container className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.sidebar}>
            <CollectionFilters className={styles.filters} facets={facets} />
          </div>
          <div className={styles.resultsGrid}>
            <div className={styles.gridHeader}>
              <CollectionPageTitle title={searchTitle} />
              <div className={styles.searchButtons}>
                <div className={styles.filterButton}>
                  <Button variant="secondary" size="sm" iconLeft={<FilterIcon />}>
                    Filter
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.productsGrid}>
              {/* @ts-expect-error - TODO for Dylan: fix the type error */}
              {products?.nodes?.map(product => (
                <>
                  {product && (
                    <React.Fragment key={product?.id}>
                      <ProductCard
                        key={product?.id}
                        product={product}
                        productGroups={productGroups}
                      />
                    </React.Fragment>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default SearchResultGrid
