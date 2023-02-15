export type Value = {
  value?: string | null
} | null

export type Announcement = {
  title?: Value
  content?: Value
  link?: Value
  font_color?: Value
  background_color?: Value
  start_date?: Value
  end_date?: Value
  countdown?: Value
}

export type AnnouncementProps = {
  announcement: Announcement
  index: number
  isActive: boolean
}
