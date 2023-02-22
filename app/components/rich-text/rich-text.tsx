//NOTE: Copied from https://github.com/Form-Factory/hydrogen-sections/blob/main/app/components/ShopifyRichText/index.jsx
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
//TODO: Find a way to use it with ts correctly
import React from 'react'

const RichText = ({ source }: { source: any }) => {
  const richTextObject = JSON.parse(source)

  return <RichTextNode {...richTextObject} />
}

const RichTextNode = ({
  count = 0,
  type,
  level,
  italic,
  bold,
  target,
  title,
  url,
  children = [],
  value,
  listType = '',
}) => {
  const Tag = {
    root: React.Fragment,
    text: 'span',
    paragraph: 'p',
    list: listType === 'unordered' ? 'ul' : 'ol',
    'list-item': 'li',
    link: 'a',
    heading: `h${level}`,
  }[type]

  const elementProps = {}
  const elementStyles = {
    fontStyle: italic ? 'italic' : null,
    fontWeight: bold ? 'bold' : null,
  }
  if (title) elementProps['title'] = title
  if (url) elementProps['href'] = url
  if (target) elementProps['target'] = target
  if (italic || bold) elementProps['style'] = elementStyles
  return (
    <Tag {...elementProps}>
      {value}
      {children.map((child, index) => (
        <RichTextNode key={`${value}-${index}`} {...child} />
      ))}
    </Tag>
  )
}

export default RichText
