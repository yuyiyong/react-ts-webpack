import * as React from 'react'
import ProBtn from 'Src/components/ProBtn/ProBtn'
import './setting/about.scss'
// import style from './setting/aa.css'
import './setting/about.scss'
// import styles from './setting/about.scss'
import ProModal from 'Components/ProModal/ProModal'
import ModalTitle from 'Src/components/ProModal/ModalTitle'
import ModalFooter from 'Src/components/ProModal/ModalFooter'
import Hello from 'Src/components/HelloWord'
import { useThemeStore, useStore, useGlobalStore } from 'Src/store/StoreProvider'
import CONST, { LANG, THEME } from 'Src/consts/CONST'
import Pre from 'Src/components/Pre/Pre'
import { TEST_TYPE } from 'Src/store/globalReducer'
import HookToast from 'Src/components/toast/HookToast'
import CustomerList from 'Src/components/CustomerList/CustomerList'
import ProductCenter from 'Src/server/ProductCenter'
// import EthHooks from 'Src/components/EthHooks/EthHooks'
import Contract from 'Src/components/EthHooks/Contract'
import { Controller, useForm } from 'react-hook-form'
import ProUpload from 'Src/components/ProUpload/ProUpload'
import CreatArt from './CreatArt'
// import { ItemInfo } from 'react-tiny-virtual-list'
// import { CustomerListRenderItem } from 'Src/components/CustomerList/CustomerList.d'

export interface IAboutProps {}

export default function About(props: IAboutProps) {
  const [visible, setVisible] = React.useState(false)
  const [visible2, setVisible2] = React.useState(false)
  const { langState, dispatchLang } = useStore()
  const { themeState, dispatchTheme } = useThemeStore()
  const { globalState, dispatchGlobal } = useGlobalStore()

  const handle = () => {
    console.log('handle -78787878')
    HookToast('hahaha')
    HookToast("123456789j")
    HookToast("nihao")
    // setVisible(true)
  }
  const onCancel = () => {
    setVisible(false)
    console.log('333')
  }
  const onOk = () => {
    setVisible2(true)
    console.log('888')
  }

  const changeLang = () => {
    console.log('state-->', langState)

    if (langState.tKey === LANG.en) {
      dispatchLang({ type: LANG.cn })
    } else {
      dispatchLang({ type: LANG.en })
    }
  }

  const changeTheme = () => {
    console.log('theme-->', themeState)
    console.log('theme-->', themeState.tTheme, THEME.dark)
    if (themeState.tTheme === THEME.dark) {
      dispatchTheme({ type: THEME.light })
    } else {
      dispatchTheme({ type: THEME.dark })
    }
  }

  const changeGlobal = async () => {
    // const Pros = () =>
    //   new Promise<{ test: string }>((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve({ test: '我是改变后的值' })
    //     }, 3000)
    //   })

    // const res = await Pros()
    dispatchGlobal({ type: TEST_TYPE, body: { test: '我是改变后的值' } })
  }

  const renderItem: CustomerListRenderItem<IGamePageRes> = ({ index, style, item }) => (
    <div key={index} style={style}>
      {' '}
      {/* // The style property contains the item's absolute position Letter:{" "} */}
      {item.titleCn}, Row: #{index}
      <div>
        <img className="img_obj" src={item.coverImage} />
      </div>
    </div>
  )

  const getFaxian: CustomerListRequestFn = ({ pageNum }: { pageNum: number }) => {
    return ProductCenter.subjectRecommendPage({ chainId: 0, pageNum, pageSize: 10, position: 1 })
  }

  const modal2Handle = () => {}
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
    setError,
  } = useForm()

  const onSubmit = async (params: any) => {
    console.log('params--->', params)
  }
  return (
    <>
      <CreatArt />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={({ field: { onChange, onBlur, value } }) => (
              <ProUpload size={{ width: 100, height: 120 }} onChange={onChange} value={value} />
            )}
            control={control}
            name="img"
          />
        </form>
      </div>
      <h3>调取合约</h3>
      {/* <EthHooks />*/}
      <Contract /> 
      <h3>customer list</h3>
      <CustomerList request={getFaxian} itemSize={200} renderItem={renderItem} height={300} />
      <h3>useReducer</h3>
      <Pre>{langState}</Pre>

      <ProBtn onClick={changeLang}>
        <h4>英文/中文</h4>
      </ProBtn>
      <Pre>{themeState}</Pre>

      <ProBtn onClick={changeTheme}>
        <h4>light/dark</h4>
      </ProBtn>

      <Pre>{globalState}</Pre>
      <ProBtn onClick={changeGlobal}>
        <h4>global</h4>
      </ProBtn>

      <h3>About</h3>
      <ProBtn onClick={handle}>click me</ProBtn>
      {/* <div className="div_wrap"></div> */}
      <div className="div_wrap"></div>
      {/* <div className={styles.div_wrap}></div> */}
      <div>222</div>
      <Hello />
      <div className="test2">6666</div>
      <div className="test_wrap">
        {/* <div className={styles.test_wrap}> */}
        <ModalTitle
          onClose={() => {
            console.log('111111')
          }}
        >
          "你12221好"
        </ModalTitle>
        <ModalFooter>
          <ProBtn onClick={modal2Handle}>确11定</ProBtn> <ProBtn>取消</ProBtn>
        </ModalFooter>
      </div>
      <ProModal visible={visible} onCancel={onCancel} onOk={onOk}>
        <div>modal提示内容</div>
        <h3>modal提示内容</h3>
      </ProModal>
      <ProModal visible={visible2} onCancel={() => setVisible2(false)} onOk={onOk}>
        <div>modal提示内容2</div>
        <h3>modal提示内容2</h3>
      </ProModal>
    </>
  )
}
