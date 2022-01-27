import * as React from 'react'
import './pwIcon.scss'

export interface IPwIconProps {
  onChange: (flag: boolean) => void
  // value:
}

export default function PwIcon({ onChange }: IPwIconProps) {
  const [flag, setflag] = React.useState(false)
  const onChangeHandle = () => {
    setflag(!flag)
    onChange(flag)
  }

  return (
    <div onClick={onChangeHandle}>
      {flag && <div className='pwicon_openIcon'></div>}
      {!flag && <div className='pwicon_closeIcon'></div>}
    </div>
  )
}
