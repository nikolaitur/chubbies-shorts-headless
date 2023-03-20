import { useEffect } from 'react'
import Container from '~/components/container'
import Section from '~/components/section'
import styles from './styles.module.css'
import type { SocialMediaPostsProps } from './types'

declare global {
  interface Window {
    nosto: any
  }
}

const SocialMediaPosts = ({ heading, description, nostoHtml }: SocialMediaPostsProps) => {
  useEffect(() => {
    try {
      if (window.nosto) window.nosto.reload()
    } catch (error) {
      console.error('Nosto Error', error)
    }
  })

  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.contentWrapper}>
          <h1 className={styles.heading}>{heading}</h1>
          <div className={styles.description}>{description}</div>
          <div
            className={styles.nostoHtml}
            dangerouslySetInnerHTML={{
              __html: nostoHtml,
            }}
          ></div>
        </div>
      </Container>
    </Section>
  )
}

export default SocialMediaPosts
