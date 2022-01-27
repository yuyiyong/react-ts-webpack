import * as React from 'react'
import './setting/inputBtn.scss'
export interface IInputBtnProps {
  children: React.ReactNode
  className?: string
}

export default function InputBtn({ children, className }: IInputBtnProps) {
  return <div className={'inputBtn' +' '+ (className ? className : '')}>{children}</div>
}
