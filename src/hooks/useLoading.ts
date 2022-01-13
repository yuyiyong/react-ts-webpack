import * as React from 'react'
import HookToast from 'Src/components/toast/HookToast'

const useLoading = (deps: boolean[]) => {
  const [loading, setloading] = React.useState(false)
  const loadingId = React.useRef<any>(null)
  React.useEffect(() => {
    let nowloading = false
    for (let i = 0; i < deps.length; i++) {
      if (deps[i]) {
        nowloading = true
        break
      }
    }

    if (nowloading) {
      if (loadingId.current === null) {
        loadingId.current = HookToast.loading('...loading')
      }
    } else {
      if (loadingId.current != null) {
        HookToast.dismiss(loadingId.current)
        loadingId.current = null
      }
    }
    setloading(nowloading)
  }, deps)
  return loading
}

export default useLoading
