import * as React from 'react'

export interface IPreProps {
  children: React.ReactNode
}

export default function Pre(props: IPreProps) {
  return (
    <pre>
      <code>{JSON.stringify(props.children, null, 1)}</code>
    </pre>
  )
}
