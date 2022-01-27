import * as React from 'react'
import './promodal.scss'
// import styles from './promodal.scss'
export interface IModalFooterProps {
  children: React.ReactNode
}

export default function ModalFooter({ children }: IModalFooterProps) {
  return <div className="m_footer_wrap_g">{children}</div>
  // return <div className={styles.footer_wrap}>{children}</div>
}
