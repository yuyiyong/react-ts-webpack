import * as React from 'react'
export interface IusePwIconStateProps {
  //   onChange: (flag: boolean) => void
}

export default function usePwIconState() {
  const [pwIconState, setState] = React.useState('password')
  const onChange = (flag: boolean) => {
    if (flag) {
      setState('text')
    } else {
      setState('password')
    }
  }
  return {
     pwIconState,
    pwIconOnChange:onChange,
  }
}
