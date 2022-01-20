import * as React from 'react'
import Pre from 'Src/components/Pre/Pre'
import useAsyncFn from 'Src/hooks/useAsyncFn'
import NftServer from 'Src/server/NftServer'
import utils from 'Src/utils/utils'

export interface IChainsCompProps {
  value: number
  onChange: (val: number) => void
}

export default function ChainsComp({ value, onChange }: IChainsCompProps) {
  const [state, dofeth] = useAsyncFn(async () => {
    const res = await NftServer.chainlist()
    let list: ICoinChainlist[] = []
    return utils.codeResult({
      res,
      success: (data) => {
        console.log('data-->', data)
        // return data
        list = data
      },
    })
  }, [])
  React.useEffect(() => {
    dofeth()
  }, [])

  const clickHandle = (val: ICoinChainlist) => {
    // console.log('val--->>', val)
    onChange(val.chainId)
  }
  return (
    <React.Fragment>
      <Pre>{value}</Pre>
      {state.value &&
        state.value.length > 0 &&
        state.value.map((item, key) => (
          <>
            <div
              key={key}
              onClick={() => {
                clickHandle(item)
              }}
            >
              {item.nameCn}
            </div>
          </>
        ))}
    </React.Fragment>
  )
}
