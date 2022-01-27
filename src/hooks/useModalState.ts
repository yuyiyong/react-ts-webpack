import * as React from 'react'

export interface IuseModalStateProps {}

export default function useModalState(props: IuseModalStateProps) {
  const [visiableModal, setVisiableModal] = React.useState(false)
  const onCancel = () => {
    setVisiableModal(false)
  }
  return {
    visiableModal,
    setVisiableModal,
    onCancel,
  }
}
