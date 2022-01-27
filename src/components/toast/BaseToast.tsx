import * as React from 'react'
import { useToaster } from 'react-hot-toast'
import './toast.scss'

export interface IBaseToastProps {}

export default function BaseToast(props: IBaseToastProps) {
  const { toasts, handlers } = useToaster()
  const { startPause, endPause, calculateOffset, updateHeight } = handlers
  return (
    <div
      style={{
        width: '500px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        zIndex: 1000,
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const offset = calculateOffset(toast, {
          reverseOrder: false,
          gutter: 8,
        })
        const ref = (el: any) => {
          if (el && !toast.height) {
            const height = el.getBoundingClientRect().height
            updateHeight(toast.id, height)
          }
        }
        return (
          <div
            className="toast_b_block"
            key={toast.id}
            ref={ref}
            style={{
              position: 'absolute',
              //   width:'calc(100% - 276px)',
              //   background: 'papayawhip',
              transition: 'all 0.5s ease-out',
              opacity: toast.visible ? 1 : 0,
              left: '50%',
              transform: `translateX(-50%) translateY(calc(-1 * (50% + ${offset}px)))`,
            }}
            {...toast.ariaProps}
          >
            {toast.message}
          </div>
        )
      })}
    </div>
  )
}
