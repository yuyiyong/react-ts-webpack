import * as React from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'

// import style from './app.scss'
import './app.scss'
import { StoreProvider } from './store/StoreProvider'
import Nav from './pages/layout/Nav'
import utils from './utils/utils'
import CONST from './consts/CONST'
import BaseToast from './components/toast/BaseToast'
import Footer from './pages/layout/Footer'
const About = React.lazy(() => import('Src/pages/about/About'))
const Home = React.lazy(() => import('./pages/home/Home'))
const Login = React.lazy(() => import('./pages/login/Login'))
const AddArt = React.lazy(() => import('./pages/artAdd/ArtAdd'))
const NoCreate = React.lazy(() => import('./pages/noCreate/NoCreate'))

export interface IAppProps {}

export default function App(props: IAppProps) {
  React.useEffect(() => {
    console.log('process.env.NODE_ENV', process.env.NODE_ENV)
    console.log('process.env.REACT_APP_ENV', process.env.REACT_APP_ENV)

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
      <div className="layout_bg">
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
                // <React.Suspense fallback={<>...</>}>
                //   <Home />
                // </React.Suspense>
                <Navigate replace to="/addArt" />
              }
            ></Route>
            <Route
              path="/addArt"
              element={
                <React.Suspense fallback={<>...</>}>
                  <AddArt />
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
            <Route
              path="/noCreate"
              element={
                <React.Suspense fallback={<>...</>}>
                  <NoCreate />
                </React.Suspense>
              }
            ></Route>
          </Routes>
        </HashRouter>
        <Footer></Footer>
      </div>
      <BaseToast />
    </StoreProvider>
  )
}
