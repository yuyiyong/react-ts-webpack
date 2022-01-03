import * as React from 'react'
import ReactDOM from 'react-dom'
import ProBtn from '../ProBtn/ProBtn'
import ModalFooter from './ModalFooter'
import ModalTitle from './ModalTitle'
import  './promodal.scss'
// import styles from './promodal.scss'

export interface IModalProps {
  visible: boolean
  style?: any
  width?: number
  zIndex?: number
  centered?: boolean
  title?: string
  footer?: any
  wrapClassName?: string
  okText?: string
  okType?: string
  cancelText?: string
  cancelType?: string
  closable?: boolean
  onOk?: () => void
  onCancel?: () => void
  mask?: boolean
  maskClosable?: boolean
  children?: React.ReactNode
}

export default function Modal({
  visible = false,
  style,
  width = 520,
  zIndex = 1000,
  centered = false,
  title = 'title',
  footer,
  wrapClassName = '',
  okText = '确定',
  okType = 'primary',
  cancelText = '取消',
  cancelType = 'default',
  closable = true,
  onOk = () => {},
  onCancel = () => {},
  mask = true,
  maskClosable = true,
  children = 'Basic body',
}: IModalProps) {
  const portalDiv = document.querySelector('body')

  return visible ? (
    portalDiv ? (
      ReactDOM.createPortal(
        <div
          style={{
            zIndex,
          }}
          className='modal_wrap'
        >
          <div className='content_wrap' style={{ minWidth: width }}>
            <ModalTitle onClose={onCancel}>{title}</ModalTitle>
            {children}
            <ModalFooter>
              <>
                <ProBtn>确定</ProBtn> <ProBtn onClick={onCancel}>取消</ProBtn>
              </>
            </ModalFooter>
          </div>
        </div>,
        // <div
        //   style={{
        //     zIndex,
        //   }}
        //   className={styles.modal_wrap}
        // >
        //   <div className={styles.content_wrap} style={{ minWidth: width }}>
        //     <ModalTitle onClose={onCancel}>{title}</ModalTitle>
        //     {children}
        //     <ModalFooter>
        //       <>
        //         <ProBtn>确定</ProBtn> <ProBtn onClick={onCancel}>取消</ProBtn>
        //       </>
        //     </ModalFooter>
        //   </div>
        // </div>,
        portalDiv,
      )
    ) : (
      <div></div>
    )
  ) : (
    <div></div>
  )
}
