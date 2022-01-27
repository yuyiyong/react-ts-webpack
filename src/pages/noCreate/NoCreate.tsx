import * as React from 'react'
import './nocreate.scss'

export interface INoCreateProps {}

export default function NoCreate(props: INoCreateProps) {
  return (
    <>
      <div className="nocreate_wrap_g">
        <div className='nocreate_img'></div>
        <div className='text_center'>目前仅向已认证用户开放创作</div>
      </div>
      <div ></div>
    </>
  )
}
