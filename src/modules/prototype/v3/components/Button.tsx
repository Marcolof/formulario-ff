import type { ButtonHTMLAttributes } from 'react'

import styles from './Button.module.css'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'md' | 'lg' | 'pill'
}

export function Button({ size = 'md', className, ...rest }: Props) {
  return <button className={[styles[size], className].filter(Boolean).join(' ')} {...rest} />
}
