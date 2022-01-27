import * as React from 'react'
import ReactDOM from 'react-dom'
import ProBtn from '../ProBtn/ProBtn'
import ModalFooter from './ModalFooter'
import ModalTitle from './ModalTitle'
import './promodal.scss'
// import styles from './promodal.scss'

export interface IModalProps {
  visible: boolean
  style?: any
  width?: number
  zIndex?: number
  centered?: boolean
  title?: string
  footer?: boolean
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
  className?: string
}

export default function ProModal({
  visible = false,
  style,
  width = 500,
  zIndex = 500,
  centered = false,
  title = '',
  footer = true,
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
  className,
}: IModalProps) {
  const portalDiv = document.querySelector('#root')

  return visible ? (
    portalDiv ? (
      ReactDOM.createPortal(
        <div
          style={{
            zIndex,
          }}
          className={'modal_wrap '}
        >
          <div className={'content_wrap ' + (className ? className : '')} style={{ width: width }}>
            <ModalTitle onClose={onCancel}>{title}</ModalTitle>
            {children}
            {footer && (
              <ModalFooter>
                <ProBtn type='minor'  className='promodal_btn_width_g' onClick={onCancel}>取消</ProBtn>
                <ProBtn className='promodal_btn_width_g' onClick={onOk}>确定</ProBtn> 
              </ModalFooter>
            )}
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
