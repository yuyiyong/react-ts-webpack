import * as React from 'react'
import './proBtn.scss'
// import styles from './proBtn.scss';

export interface IProBtnProps {
  children: React.ReactNode
  className?: string
  onClick?: (() => any) | any
  type?: 'minor' | 'primary'
}

export default function ProBtn({ children, className, onClick, type = 'primary' }: IProBtnProps) {
  return (
    <div
      className={(type === 'primary' ? 'probtn' : 'pro_minor_btn') +' '+ (className ? className : '')}
      onClick={onClick && onClick}
    >
      {/* <div className={styles.btn} onClick={props.onClick && props.onClick}> */}
      {children}
    </div>
  )
}
