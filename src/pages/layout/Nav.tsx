import * as React from 'react'
import ProBtn from 'Src/components/ProBtn/ProBtn'
import ProLink from 'Src/components/ProLink/ProLink'
import './setting/nav.scss'
export interface INavProps {}
import { Router, useNavigate } from 'react-router-dom'
import { useGlobalStore } from 'Src/store/StoreProvider'
import Pre from 'Src/components/Pre/Pre'
import UserCenter from 'Src/server/UserCenter'
import utils from 'Src/utils/utils'
import { USER_INFO } from 'Src/store/globalReducer'

export default function Nav(props: any) {
  const { globalState, dispatchGlobal } = useGlobalStore()
  let navigate = useNavigate()
  // const history = useNavigate();
  const registHandel = () => {}

  React.useEffect(() => {
    console.log('1111----nav', globalState.userInfo)
    getInfo()
    // if (!globalState.userInfo) {
    //   console.log('重定向---login')
    // }
  }, [])

  const getInfo = async () => {
    const res = await UserCenter.infoSet()
    utils.codeResult({
      res,
      success: (data) => {
        dispatchGlobal({ type: USER_INFO, body: { userInfo: data } })
      },
      error: (data) => {
        console.log('data,error-->', data)
        //TODO 跳转
      },
    })
  }

  const goHome = () => {
    navigate('/')
  }

  return (
    <nav className="nav_wrap">
      {/* <div></div>
      <div className="nav_menu">
        <ProLink to="/">Home</ProLink>
        <ProLink to="/about">about</ProLink>
      </div>
      <div>
        <ProLink to="/login">login</ProLink>
      </div> */}
      <div className="nav_max_wrap">
        <div className="logo_wrap">
          <div className="logo" onClick={goHome}></div>
          <div>
            <h1>米塔</h1>
            <div className="log_sub_title">NFT艺术交易平台</div>
          </div>
        </div>
        <div className="regist_btn_wrap">
          <div className="nav_icon"></div>
          {globalState.userInfo && globalState.userInfo.mobile ? (
            <div>{globalState.userInfo?.mobile}</div>
          ) : (
            <ProLink to={'/login'}>
              <ProBtn className="regist_btn" onClick={registHandel}>
                注册/登陆
              </ProBtn>
            </ProLink>
          )}
        </div>
      </div>
    </nav>
  )
}
