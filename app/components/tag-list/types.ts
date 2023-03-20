import { HTMLAttributes } from 'react'

export type TagListProps = HTMLAttributes<HTMLUListElement> & { tags: string[] | undefined | null }
