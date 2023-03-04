import Button from '@solo-brands/ui-library.ui.atomic.button'
import { ChevronDownIcon, FilterIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import CollectionFilters from '~/components/collection-filters'
import CollectionPageTitle from '~/components/collection-page-title'
import Container from '~/components/container'
import Section from '~/components/section'
import styles from './styles.module.css'

const SearchResultGrid = () => {
  const title = 'sample'
  const searchTitle = `Results for "${title}"`
  return (
    <Section>
      <Container className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.sidebar}>
            <CollectionFilters className={styles.filters} />
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
                <div>
                  <Button variant="tertiary" size="sm" iconRight={<ChevronDownIcon />}>
                    Sort By
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.productsGrid}>
              {/*<ProductCard />
              <ProductCard />*/}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default SearchResultGrid
