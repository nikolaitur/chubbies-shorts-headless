import { CollectionSortByProps, SortingOption } from './types'
import Button from '@solo-brands/ui-library.ui.atomic.button/dist/button'
import DropdownOptionGroup from '@solo-brands/ui-library.ui.atomic.dropdown-option-group'
import { Option } from '@solo-brands/ui-library.ui.atomic.dropdown-option-group/dist/dropdown-option-group'
import { ChevronDownIcon } from '@solo-brands/ui-library.ui.atomic.icon'
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from '@remix-run/react'

const CollectionSortBy = ({ sorting }: CollectionSortByProps) => {
  const { pathname, state } = useLocation()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const navigateOptions = {
    replace: true,
    state,
  }

  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState({
    value: '',
    text: '',
  })
  const handleSortByOpen = () => {
    setIsOpen(!isOpen)
  }
  const sortOptions = sorting.options.map((option: SortingOption) => {
    return {
      value: `${option?.field}&&${option?.direction}`,
      text: option?.label,
    }
  })

  const setSortOption = (option: Option) => {
    if (option?.value !== '') {
      const [field, direction] = option.value.split('&&')

      searchParams.forEach((val, key) => {
        if (key.includes('sort.')) {
          searchParams.delete(key)
        }
      })

      searchParams.set(`sort.${field}`, direction)
      navigate({ pathname, search: searchParams.toString() }, navigateOptions)
      handleSortByOpen()
    }
  }

  return (
    <>
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
        options={sortOptions}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        onChangeHandler={(option: Option) => setSortOption(option)}
        open={isOpen}
      />
    </>
  )
}

export default CollectionSortBy
