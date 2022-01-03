import React, { useEffect, useState } from 'react'
import utils from 'Src/utils/utils'

export default () => {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const _isMobile = utils.isMobile()
    console.log('_isMobile˝', _isMobile)
    if (_isMobile) {
      setIsMobile(_isMobile)
      ;(window as any).onresize = () => {
        console.log('2222')

        utils.setRem()
      }
    }
  }, [])
  return { isMobile }
}
