import * as React from 'react'
import  './promodal.scss'
// import styles from './promodal.scss'
export interface IModalTitleProps {
  children: React.ReactNode
  onClose: () => void
}

export default function ModalTitle({ children, onClose }: IModalTitleProps) {
  return (
    <div className="modal_title_wrap">
      <div className='modaltitle_close' onClick={onClose}>
        
      </div>
      {children}
    </div>
    // <div className={styles.title}>
    //   <div className={styles.close} onClick={onClose}>
    //     X
    //   </div>
    //   {children}
    // </div>
  )
}
