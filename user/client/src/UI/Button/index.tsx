import { CSSProperties, FC, ReactNode } from 'react'
import './index.scss'

interface Props {
  type:
    | 'primary'
    | 'regular-dark'
    | 'regular-light'
    | 'outlined'
    | 'cancel'
    | 'cancel-outlined'
  size: 'small' | 'medium' | 'large'
  onClick: () => void
  children: ReactNode
  style?: CSSProperties
  className?: string
}

const Button: FC<Props> = ({
  type,
  size = 'medium',
  onClick,
  children,
  style,
  className,
}) => {
  return (
    <button
      style={style}
      className={`button ${size} ${type} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
