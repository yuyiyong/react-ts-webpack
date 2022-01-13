import * as React from 'react'
import { Routes, Route, Outlet, Link, useMatch, useResolvedPath, LinkProps } from 'react-router-dom'
import './proLink.scss'
export default function ProLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to)
  let match = useMatch({ path: resolved.pathname, end: true })

  return (
    <div>
      <Link
        className={match ? 'active' : ''}
        style={{ textDecoration: match ? 'underline' : 'none' }}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </div>
  )
}
