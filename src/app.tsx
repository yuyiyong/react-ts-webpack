import * as React from 'react'
import { HashRouter, Route, Routes, Link } from 'react-router-dom'

// import style from './app.scss'
import './app.scss'
import ProLink from './components/ProLink/ProLink'
import { Toast, ToastBar, Toaster } from 'react-hot-toast'
import { StoreProvider } from './store/StoreProvider'
import Nav from './pages/layout/Nav'
import utils from './utils/utils'
import CONST from './consts/CONST'
const About = React.lazy(() => import('Src/pages/about/About'))
const Home = React.lazy(() => import('./pages/home/Home'))
const Login = React.lazy(() => import('./pages/login/Login'))

export interface IAppProps {}

export default function App(props: IAppProps) {
  React.useEffect(() => {
    console.log('cookie---', utils.getCookie(CONST.COOKIE.DEVICE))
    if (!utils.getCookie(CONST.COOKIE.DEVICE)) {
      utils.setCookie(CONST.COOKIE.DEVICE, utils.getBrowserInfo().browser, CONST.COOKIE.DAY)
    }
  }, [])
  // const myStyle = (t: Toast) => {
  //   return {
  //     ...t.style,
  //     border: '1px solid #713200',
  //     padding: '10px',
  //     color: '#713200',

  //     // ...{ ...(t.visible ? style.enters : style.exit) },
  //     animation: t.visible ? `customEnter 0.7s ease` : `customExit 0.7s ease`,
  //     // animation: t.visible ? `${style.customEnter} 0.7s ease` : `${style.customExit} 0.7s ease`,
  //     // ...style['custom-enter'],
  //     // ...style['custom-exit'],}
  //   }
  // }

  return (
    <StoreProvider>
      <HashRouter>
        {/* <nav className={style.nav_wrap}> */}
        <Nav />
        <Routes>
          {/*  <Route
            path="about"
            element={
              <React.Suspense fallback={<>...</>}>
                <About />
              </React.Suspense>
            }
          />*/}
          <Route
            path="/"
            element={
              <React.Suspense fallback={<>...</>}>
                <Home />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/about"
            element={
              <React.Suspense fallback={<>...</>}>
                <About />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            }
          ></Route>
        </Routes>
      </HashRouter>
      <Toaster
      
        toastOptions={{
          // duration:1,
          className: 'toast',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
            // animation: t.visible ? `${style.customEnter} 0.7s ease` : `${style.customExit} 0.7s ease`,

            // ...{ ...(t.visible ? style.enters : style.exit) },
          },
        }}
        containerStyle={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
        }}
      />
        {/* {(t) => (
          // style={myStyle(t)}
          <ToastBar toast={t}>{({ icon, message }) => <>{message}</>}</ToastBar>
        )} */}
    </StoreProvider>
  )
}
