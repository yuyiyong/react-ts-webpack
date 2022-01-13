import * as React from 'react'
import ProLink from 'Src/components/ProLink/ProLink'
import './setting/nav.scss'
export interface INavProps {}

export default function Nav(props: INavProps) {
  return (
    <nav className="nav_wrap">
        <div></div>
      <div className="nav_menu">
        <ProLink to="/">Home</ProLink>
        <ProLink to="/about">about</ProLink>
      </div>
      <div>
        <ProLink to="/login">login</ProLink>
      </div>
    </nav>
  )
}
