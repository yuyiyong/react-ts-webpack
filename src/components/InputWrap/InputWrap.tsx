import * as React from 'react';
import "./setting/inputWrap.scss"

export interface IInputWrapProps {
    children:React.ReactNode
}

export default function InputWrap (props: IInputWrapProps) {
  return (
    <div className='wrap'>
      {props.children}
    </div>
  );
}
