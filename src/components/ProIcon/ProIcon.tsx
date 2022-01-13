import * as React from 'react'
import '../../../public/assets/iconfont/iconfont.css'

export interface IProIconProps {
  children: React.ReactNode
  className?: string
}

export default function ProIcon({ children, className }: IProIconProps) {

  return <i className={'iconfont ' + (className ? className : '')}>{children}</i>
}
