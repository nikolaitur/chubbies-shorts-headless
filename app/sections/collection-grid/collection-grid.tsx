import Button from '@solo-brands/ui-library.ui.atomic.button'
import DropdownOptionGroup from '@solo-brands/ui-library.ui.atomic.dropdown-option-group'
import { ChevronDownIcon, FilterIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import BreadCrumbs from '@solo-brands/ui-library.ui.shared.bread-crumbs'
import { useState } from 'react'
import CollectionFilters from '~/components/collection-filters'
import CollectionPageTitle from '~/components/collection-page-title'
import Container from '~/components/container'
import ProductCard from '~/components/product-card'
import Section from '~/components/section'
import { ProductCardQuery } from '~/graphql/generated'
import CollectionBanner from './collection-banner'
import styles from './styles.module.css'

const CollectionGrid = ({ products }: { products?: ProductCardQuery['nodes'] | null }) => {
  const [isOpen, setIsOpen] = useState(false)
  const options = [
    {
      value: 'option_1',
      text: 'Option 1',
    },
    {
      value: 'option_2',
      text: 'Option 2',
    },
    {
      value: 'option_3',
      text: 'Option 3',
    },
    {
      value: 'option_4',
      text: 'Option 4',
    },
    {
      value: 'option_5',
      text: 'Option 5',
    },
  ]

  const handleSortByOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <Section>
      <Container className={styles.container}>
        {/* TODO: Change breadcrumb path on logic */}
        <BreadCrumbs path={'/home/sport-shorts/retro-tracksuit-shorts'}></BreadCrumbs>
        <div className={styles.grid}>
          <div className={styles.sidebar}>
            <CollectionFilters className={styles.filters} />
          </div>
          <div className={styles.resultsGrid}>
            <CollectionBanner className={styles.collectionPromoBanner}></CollectionBanner>
            <div className={styles.gridHeader}>
              <CollectionPageTitle title="Title" description={'test'} />
              <div className={styles.searchButtons}>
                <div className={styles.filterButton}>
                  <Button variant="secondary" size="sm" iconLeft={<FilterIcon />}>
                    Filter
                  </Button>
                </div>
                <div className={styles.sortByButton}>
                  <Button
                    variant="tertiary"
                    size="sm"
                    iconRight={<ChevronDownIcon />}
                    onClick={handleSortByOpen}
                  >
                    Sort By
                  </Button>
                  <DropdownOptionGroup
                    data-testid="dropdown-option-group"
                    isStandAlone={true}
                    options={options}
                    open={isOpen}
                  />
                </div>
              </div>
            </div>
            <div className={styles.productsGrid}>
              {products?.map(product => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default CollectionGrid
