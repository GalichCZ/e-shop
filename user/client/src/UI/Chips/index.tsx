import { FC } from 'react'

interface Props {
  prefix?: boolean
  postfix?: boolean
  imgUrl?: string
  imgAlt?: string
  content: string
  url: string
}

const Chips: FC<Props> = ({
  content,
  prefix,
  imgUrl,
  postfix,
  imgAlt,
  url,
}) => {
  const isPrefix = !!prefix && !!imgUrl
  const isPostfix = !!postfix && !!imgUrl

  return (
    <div>
      {isPrefix && <img src={imgUrl} alt={imgAlt} />}
      <a href={url}>{content}</a>
      {isPostfix && <img src={imgUrl} alt={imgAlt} />}
    </div>
  )
}

export default Chips
