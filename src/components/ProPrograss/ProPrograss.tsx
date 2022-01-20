import * as React from 'react'
import './proPrograss.scss'
export interface IProPrograssProps {
  size: SizeType
  prograss?: number
}

export default function ProPrograss({ size, prograss }: IProPrograssProps) {
  const [present, setPresent] = React.useState(0)
  React.useEffect(() => {
    console.log('---prograss--', prograss)

    setPresent(prograss ? prograss : 0)
  }, [prograss])
  return (
    <>
      <div
        className="loading"
        style={{
          width: typeof size.width === 'number' ? size.width + 'px' : size.width,
          height: typeof size.height === 'number' ? size.height + 'px' : size.height,
        }}
      >
        <div className="progress" style={{ width: present + '%' }}></div>
      </div>
    </>
  )
}
