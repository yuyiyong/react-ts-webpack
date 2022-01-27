import * as React from 'react'
import './protabs.scss'

type tabsListItemType = {
  label: string
  id: number
}
export interface IProTabsProps {
  list: tabsListItemType[] | []
  onChange?: (val: number, item: tabsListItemType) => void
}

export default function ProTabs({ list = [] }: IProTabsProps) {
  const [activeId, setId] = React.useState(list[0].id)

  return (
    <div className='protabs_g_wrap'>
      {list &&
        list.length > 0 &&
        list.map((item, index) => (
          <div className='protabs_block'>
            <div key={index} className={`protabsItem ${activeId === item.id && 'active'}`}>
              {item.label}
            </div>
            <div className={`protabs_line`} style={activeId === item.id ? { background: '#5341b0' } : {}}></div>
          </div>
        ))}
    </div>
  )
}
