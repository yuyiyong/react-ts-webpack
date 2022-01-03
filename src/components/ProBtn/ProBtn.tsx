import * as React from 'react'
import   './proBtn.scss';
// import styles from './proBtn.scss';

export interface IProBtnProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function ProBtn(props: IProBtnProps) {
  return (
    <div className='btn' onClick={props.onClick && props.onClick}>
    {/* <div className={styles.btn} onClick={props.onClick && props.onClick}> */}
      {props.children}
    </div>
  )
}
