import * as React from 'react'
import Pre from '../Pre/Pre'

interface IProImgstype extends IFormType<string | string[] | undefined> { size?: SizeType}

export default function ProImgs({ value, onChange,size = { width: 80, height: 80 }, }: IProImgstype) {
  const [srcArr, setSrcArr] = React.useState<string[]>([])
  React.useEffect(() => {
    if (value) {
      console.log('value-->>>', value)

      if (typeof value === 'string') {
        const arr = []
        arr.push(value)
        setSrcArr(arr)
      } else {
        setSrcArr(value)
      }
    }
  }, [value])
  return (
    <div>
      {/* <Pre>{srcArr}</Pre> */}
      {srcArr &&
        srcArr.length > 0 &&
        srcArr.map((item, index) => {
          return <img 
          style={{ height: size.height, width: size.width, objectFit: 'contain' }}
          key={index} src={item} />
        })}
    </div>
  )
}
