import * as React from 'react'
import ProBtn from 'Src/components/ProBtn/ProBtn'
import './setting/about.scss'
// import style from './setting/aa.css'
import './setting/about.scss'
// import styles from './setting/about.scss'
import toast from 'react-hot-toast'
import ProModal from 'Components/ProModal/ProModal'
import ModalTitle from 'Src/components/ProModal/ModalTitle'
import ModalFooter from 'Src/components/ProModal/ModalFooter'
export interface IAboutProps {}

export default function About(props: IAboutProps) {
  const [visible, setVisible] = React.useState(false)

  const handle = () => {
    console.log('handle -78787878')
    toast('hahaha')
    setVisible(true)
  }
  const onCancel = () => {
    setVisible(false)
    console.log("333");
    
  }
  const onOk = () => {
    setVisible(true)
    console.log('888')
  }

  console.log('1211')

  return (
    <>
      <h3>About</h3>
      <ProBtn onClick={handle}>click me</ProBtn>
      {/* <div className="div_wrap"></div> */}
      <div className="div_wrap"></div>
      {/* <div className={styles.div_wrap}></div> */}
      <div>222</div>
      <div className="test_wrap">
        {/* <div className={styles.test_wrap}> */}
        <ModalTitle onClose={() => {}}>"你12221好"</ModalTitle>
        <ModalFooter>
          <ProBtn>确11定</ProBtn> <ProBtn>取消</ProBtn>
        </ModalFooter>
      </div>
      <ProModal visible={visible} onCancel={onCancel} onOk={onOk}>
        <div>modal提示内容</div>
        <h2>modal提示内容</h2>
      </ProModal>
    </>
  )
}
