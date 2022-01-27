import * as React from 'react'
import './proCard.scss'

export interface IProCardProps {
  children: React.ReactNode
  title?: string
  className?: string
}

export default function ProCard({ children, title, className }: IProCardProps) {
  return (
    <div className={'procard_g_wrap ' + (className ? className : '')}>
      {title && <div className="procard_title">{title}</div>}
      <div className='procard_content'>{children}</div>
    </div>
  )
}
