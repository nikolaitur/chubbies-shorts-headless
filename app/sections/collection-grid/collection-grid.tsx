import { RouteMatch, useMatches } from '@remix-run/react'
import Button from '@solo-brands/ui-library.ui.atomic.button'
import { FilterIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import BreadCrumbs from '@solo-brands/ui-library.ui.shared.bread-crumbs'
import React from 'react'
import CollectionFilters from '~/components/collection-filters'
import CollectionPageTitle from '~/components/collection-page-title'
import CollectionSortBy from '~/components/collection-sort-by'
import Container from '~/components/container'
import ProductCard from '~/components/product-card'
import Section from '~/components/section'
import { COLLECTION_ROUTE_ID } from '~/constants'
import styles from './styles.module.css'
import { CollectionGridProps } from './types'

const CollectionGrid = ({ products, collection }: CollectionGridProps) => {
  const { title, description, handle } = collection ?? {}

  // SEARCH SPRING DATA
  const matches = useMatches()
  const collectionMatch = matches.find(match => match.id === COLLECTION_ROUTE_ID) as RouteMatch
  const { productGroups, facets, sorting } = collectionMatch?.data || {}

  return (
    <Section>
      <Container className={styles.container}>
        <BreadCrumbs path={`/home/${handle}`}></BreadCrumbs>
        <div className={styles.grid}>
          <div className={styles.sidebar}>
            <CollectionFilters className={styles.filters} facets={facets} />
          </div>
          <div className={styles.resultsGrid}>
            <div className={styles.gridHeader}>
              <CollectionPageTitle title={title} description={description} />
              <div className={styles.searchButtons}>
                <div className={styles.filterButton}>
                  <Button variant="secondary" size="sm" iconLeft={<FilterIcon />}>
                    Filter
                  </Button>
                </div>
                <div className={styles.sortByButton}>
                  <CollectionSortBy sorting={sorting} />
                </div>
              </div>
            </div>
            <div className={styles.productsGrid}>
              {/* @ts-expect-error - TODO for Dylan: fix the type error */}
              {products?.nodes?.map(product => (
                <>
                  {product && (
                    <React.Fragment key={product?.id}>
                      <ProductCard product={product} productGroups={productGroups} />
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

export default CollectionGrid
