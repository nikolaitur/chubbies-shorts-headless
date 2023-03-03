import { useMemo, useState } from 'react'
import { MenuFragment, NavCollectionFragment } from '~/graphql/generated'
import MobileAccordionMenu from '~/sections/header/mobile-accordion-menu'
import MobileMenu from '~/sections/header/mobile-menu'
import OverlayModal from '../overlay-modal/overlay-modal'

const MobileNav = ({
  menu,
  isNavOpen,
  closeNav,
  navImages,
}: {
  menu?: MenuFragment | null
  isNavOpen: boolean
  closeNav: () => void
  navImages?: (NavCollectionFragment | null)[] | null
}) => {
  const [openedSubMenu, setOpenedSubMenu] = useState<string | null>(null)

  const openedSubMenuData = useMemo(() => {
    return menu?.items?.find(item => item.title === openedSubMenu)
  }, [openedSubMenu, menu])

  const handleClose = () => {
    setOpenedSubMenu(null)
    closeNav()
  }

  return (
    <>
      <OverlayModal title="Menu" isOpened={isNavOpen} onClose={closeNav}>
        {menu?.items?.map(item => (
          <MobileMenu item={item} key={item.title} onOpen={() => setOpenedSubMenu(item.title)} />
        ))}
      </OverlayModal>
      <OverlayModal
        title={openedSubMenuData?.title}
        isOpened={!!openedSubMenu}
        onBack={() => setOpenedSubMenu(null)}
        onClose={handleClose}
        index={2}
        hasBackOption={true}
      >
        {openedSubMenuData && (
          <MobileAccordionMenu navImages={navImages} item={openedSubMenuData} />
        )}
      </OverlayModal>
    </>
  )
}

export default MobileNav
