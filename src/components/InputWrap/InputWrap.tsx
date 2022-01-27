import * as React from 'react'
import './setting/inputWrap.scss'

export interface IInputWrapProps {
  children: React.ReactNode
  type?: 'login' | 'comm' | 'textarea' |'modal'
}

export default function InputWrap({ children, type = 'comm' }: IInputWrapProps) {
  const switchClass = () => {
    switch (type) {
      case 'login':
        return 'login_input_wrap'
      case 'comm':
        return 'input_wrap'
      case 'textarea':
        return 'textarea_input_wrap'
      case 'modal':
        return 'modal_input_wrap'
      default:
        return 'input_wrap'
        break
    }
  }
  return (
    <React.Fragment>
      <div className={switchClass()}>{children}</div>
      {type === 'login' && <div className="line_l_box_s"></div>}
    </React.Fragment>
  )
}
