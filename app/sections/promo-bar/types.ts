import { HTMLAttributes } from 'react'
import { AnnouncementContent, MenuFragment } from '~/graphql/generated'

export type PromoBarProps = HTMLAttributes<HTMLElement> & {
  announcements?: AnnouncementContent[]
  menuLinks?: MenuFragment | null
}
