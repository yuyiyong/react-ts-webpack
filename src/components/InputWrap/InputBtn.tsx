import * as React from 'react'
import "./setting/inputBtn.scss"
export interface IInputBtnProps {
  children: React.ReactNode
}

export default function InputBtn(props: IInputBtnProps) {
  return <div className='inputBtn'>{props.children}</div>
}
