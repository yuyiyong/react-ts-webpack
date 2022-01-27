import * as React from 'react'
import { Control, Controller, useForm, useWatch } from 'react-hook-form'
import InputBtn from 'Src/components/InputWrap/InputBtn'
import InputWrap from 'Src/components/InputWrap/InputWrap'
import ProBtn from 'Src/components/ProBtn/ProBtn'
import ProIcon from 'Src/components/ProIcon/ProIcon'
import '../../../public/assets/iconfont/iconfont.css'
import './setting/login.scss'
import UserCenter from 'Src/server/UserCenter'
import utils from 'Src/utils/utils'
import Pre from 'Src/components/Pre/Pre'
import useLoading from 'Src/hooks/useLoading'
import useAsyncFn from 'Src/hooks/useAsyncFn'
import ProUpload from 'Src/components/ProUpload/ProUpload'
import { SEND_EMAIL_TYPE, SEND_MOBILE_TYPE } from 'Src/consts/ENUM'
import HookToast from 'Src/components/toast/HookToast'
import CONST from 'Src/consts/CONST'
import { useNavigate } from 'react-router-dom'
import SwitchAgree from './components/SwitchAgree'
import { useGlobalStore } from 'Src/store/StoreProvider'
import { TEST_TYPE, USER_INFO } from 'Src/store/globalReducer'
import ProModal from 'Src/components/ProModal/ProModal'
import useModalState from 'Src/hooks/useModalState'

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
    setError,
    clearErrors,
  } = useForm<LoginParams>()

  const countryCode = 86
  const [count, setCount] = React.useState(0)
  const { globalState, dispatchGlobal } = useGlobalStore()

  let navigate = useNavigate()

  const timerRef = React.useRef(null)

  const clearTimerInterver = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
  }

  const startCountdown = () => {
    let nowCount = 30
    setCount(nowCount)
    console.log('nowCount---', nowCount)
    setInterval(() => {
      if (nowCount - 1 >= 0) {
        nowCount = nowCount - 1
        setCount(nowCount)
      } else {
        clearTimerInterver()
        nowCount = 0
      }
    }, 1000)
  }

  //   {
  //   defaultValues:
  //     tabKey === LoginTab.email
  //       ? ({ email: '1191893756@qq.com', code: '1123', img: 'er花' } as loginByEmailParams)
  //       : ({ mobile: 18967129601, code: '1122', countryCode: 86 } as loginByMobileParams),
  // }
  // const [infoState, setInfoState] = React.useState<null | InfoSetResponse>(null)

  // React.useEffect(() => {
  //   if (tabKey === LoginTab.email) {
  //     setValue('email', '1191893756@qq.com')
  //     setValue('code', '123456')
  //     setValue('img', '小黑')
  //   } else {
  //     setValue('mobile', 18967129601)
  //     setValue('code', '123456')
  //     setValue('countryCode', 86)
  //   }
  // }, [tabKey])

  // const getEMail = async () => {
  //   console.log('getEmail...')
  //   const emailValue = getValues('email')
  //   if (!emailValue) {
  //     setError(
  //       'email',
  //       {
  //         type: 'type',
  //         message: 'reque',
  //       },
  //       { shouldFocus: true },
  //     )
  //     return
  //   }
  //   const res = await UserCenter.sendEmail({ email: emailValue, type: SEND_EMAIL_TYPE.loginOrRegistor })
  //   console.log('res ==>', res)
  //   utils.codeResult({
  //     res,
  //     success: (data) => {
  //       console.log('data===>', data)
  //       HookToast('发送成功')
  //     },
  //   })
  // }

  const getMobileCode = async () => {
    clearTimerInterver()
    const mobile = getValues('mobile')
    // const countryCode = getValues('countryCode')
    if (!mobile) {
      setError('mobile', { type: 'type', message: 'requre' }, { shouldFocus: true })
      return
    }
    clearErrors()
    // if (!countryCode) {
    //   setError('countryCode', { type: 'type', message: 'requre' }, { shouldFocus: true })
    //   return
    // }
    startCountdown()
    const res = await UserCenter.sendSms({ mobile, countryCode, type: SEND_MOBILE_TYPE.loginOrRegistor })
    utils.codeResult({
      res,
      success: (data) => {
        HookToast('发送成功')
        startCountdown()
      },
    })
  }

  // const [infoSet, doInfo] = useAsyncFn(async () => {
  //   // const getMail = await getEMail()
  //   const res = await UserCenter.infoSet()
  //   return res
  //   // console.log('res', res)
  // }, [])

  // const [loginEmail, doEmailLogin] = useAsyncFn(async () => {
  //   console.log('bb-->', tempararyParamsRef.current)

  //   const res = await UserCenter.loginByEmail({ email: 'string', code: 'string', img: 'sss' })
  //   return res
  // }, [])
  const tempararyParamsRef = React.useRef<LoginParams | {}>({})

  const [loginMobile, doMobileLogin] = useAsyncFn(async () => {
    console.log('tempararyParamsRef.current--', tempararyParamsRef.current)
    // navigate('/about')
    // return
    const res = await UserCenter.loginByMobile(tempararyParamsRef.current)
    utils.codeResult({
      res,
      success: (data) => {
        HookToast('登陆成功')
        console.log('data.accessToken--', data.accessToken)
        if (data.accessToken) utils.setCookie(CONST.COOKIE.TOKENS, data.accessToken, CONST.COOKIE.DAY)
        dispatchGlobal({ type: USER_INFO, body: { userInfo: data } })
        navigate('/addArt')
      },
    })
  }, [])

  // const loadings = useLoading([loginEmail.loading, infoSet.loading])
  const onSubmit = async (params: LoginParams) => {
    params.countryCode = countryCode
    tempararyParamsRef.current = params
    // if (tabKey === LoginTab.email) {
    //   doEmailLogin()
    // }
    // if (tabKey === LoginTab.mobile) {

    // }

    doMobileLogin()
    // console.log('params==>', params)
    // const res = await UserCenter.loginByEmail(params)
    // console.log('res===>', res)
    // utils.codeResult<LoginEmailResponse>({
    //   res,
    //   success: (data) => {
    //     toast('登陆成功')
    //     console.log('data', data)
    //     utils.setCookie(CONST.COOKIE.TOKENS, data.accessToken, CONST.COOKIE.DAY)
    //   },
    // })
  }

  // const tabKeyHandle = (val: LoginTab) => {
  //   setTabKey(val)
  //   tempararyParamsRef.current = {}
  // }
  const showXieyi = () => {
    console.log('xxx---')
  }

  return (
    <div className="login_g_wrap">
      <div className="bg"></div>
      <div className="login_max_wrap">
        <div></div>
        <div className="login_wrap">
          <div className="login_head">注册/登录</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="label">手机号</div>
            <InputWrap type={'login'}>
              <input
                {...register('mobile', {
                  required: true,
                  // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                })}
                placeholder="请输入手机号"
              />
            </InputWrap>
            {errors.mobile && <span className="error_massage_form">手机号不能为空</span>}
            {/* <div>国家号</div>
            <InputWrap type={'login'}>
              <input
                {...register('countryCode', {
                  required: true,
                  // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                })}
              />
            </InputWrap> */}
            <div className="label margin_t_15">验证码</div>
            <InputWrap type={'login'}>
              <input
                placeholder="请输入4位验证码"
                {...register('code', { required: true })}
                // style={{ fontSize: '20px' }}
              />
              <div className="getcode_btn" onClick={count === 0 ? getMobileCode : () => {}}>
                {count === 0 ? '获取验证码' : count + ' S'}
              </div>
            </InputWrap>
            {errors.code && <span className="error_massage_form">验证码不能为空</span>}
            <Controller
              render={({ field: { onChange, onBlur, value } }) => <SwitchAgree onChange={onChange} value={value} />}
              control={control}
              rules={{ required: true }}
              name="agree"
            />
            {errors.agree && <span className="error_massage_form">阅读并同意协议</span>}

            <InputBtn className="btn_login">
              <input type="submit" value="注册/登陆"></input>
            </InputBtn>
          </form>
        </div>
      </div>
    </div>
  )
}

function IsolateReRender({ control }: { control: Control<loginByEmailParams> }) {
  const firstName = useWatch({
    control,
    name: 'email',
    defaultValue: 'default',
  })

  return <div>{firstName + '你好'}</div>
}

// const nullCC = () => {
//   enum LoginTab {
//     email,
//     mobile,
//   }
//   const [tabKey, setTabKey] = React.useState(LoginTab.email)

//   /*   const email = useWatch({
//     control,
//     name: 'email',
//     defaultValue: 'default',
//   })

//   React.useEffect(() => {
//     console.log('email--11--', email)
//     // setValue('code',email+'nh')
//   }, [email]) */

//   return (
//     <>
//       <>
//         <h1>
//           <ProIcon>&#xe66f;</ProIcon> Login
//         </h1>
//         {/* <form onSubmit={handleSubmit(onSubmit)}> */}
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="lc">
//             <h2 onClick={() => tabKeyHandle(0)}>Email</h2>
//             <div> &nbsp; &nbsp; &nbsp; </div>
//             <h2 onClick={() => tabKeyHandle(1)}>Phone</h2>
//           </div>

//           {/* <Controller
//             render={({ field: { onChange, onBlur, value } }) => (
//               <ProUpload size={{ width: 100, height: 120 }} onChange={onChange} value={value} />
//             )}
//             control={control}
//             name="img"
//           /> */}
//           {/* register your input into the hook by invoking the "register" function */}

//           {tabKey === LoginTab.email && (
//             <React.Fragment>
//               <InputWrap>
//                 <input
//                   {...register('email', {
//                     required: true,
//                     // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
//                   })}
//                 />
//               </InputWrap>
//               {errors.email && <span>This field is required</span>}
//             </React.Fragment>
//           )}
//           {tabKey === LoginTab.mobile && (
//             <React.Fragment>
//               <InputWrap>
//                 <input
//                   {...register('mobile', {
//                     required: true,
//                     // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
//                   })}
//                 />
//               </InputWrap>
//               {errors.mobile && <span>This field is required</span>}

//               <InputWrap>
//                 <input
//                   {...register('countryCode', {
//                     required: true,
//                     // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
//                   })}
//                 />
//               </InputWrap>
//               {errors.countryCode && <span>This field is required</span>}
//             </React.Fragment>
//           )}
//           {/* include validation with required or other standard HTML validation rules */}
//           <InputWrap>
//             <input {...register('code', { required: true })} style={{ fontSize: '20px' }} />
//             {/* <ProBtn onClick={doInfo}>get Code</ProBtn> */}
//             {tabKey === LoginTab.email && <ProBtn onClick={getEMail}>get Code</ProBtn>}
//             {tabKey === LoginTab.mobile && <ProBtn onClick={getMobileCode}>get Code</ProBtn>}
//           </InputWrap>
//           {/* errors will return when field validation fails  */}
//           {errors.code && <span>This field is required</span>}

//           <InputBtn>
//             <input type="submit" value="登陆"></input>
//           </InputBtn>
//           <IsolateReRender control={control} />
//         </form>
//         <ProBtn onClick={doEmailLogin}>InfoSet</ProBtn>
//       </>
//       <Pre>{infoSet}</Pre>
//       <>
//         {/* <Pre>{infoState}</Pre> */}
//         {/* <Pre>{login}</Pre> */}
//       </>
//       <h3>loading</h3>
//       <Pre>{loadings}</Pre>
//     </>
//   )
// }
