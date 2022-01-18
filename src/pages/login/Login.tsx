import * as React from 'react'
import { Control, Controller, useForm, useWatch } from 'react-hook-form'
import InputBtn from 'Src/components/InputWrap/InputBtn'
import InputWrap from 'Src/components/InputWrap/InputWrap'
import ProBtn from 'Src/components/ProBtn/ProBtn'
import ProIcon from 'Src/components/ProIcon/ProIcon'
import '../../../public/assets/iconfont/iconfont.css'
import './setting/login.scss'
import UserCenter from 'Src/server/UserCenter'
import { SEND_EMAIL_TYPE } from 'Src/consts/ENUM'
import utils from 'Src/utils/utils'
import Pre from 'Src/components/Pre/Pre'
import useLoading from 'Src/hooks/useLoading'
import useAsyncFn from 'Src/hooks/useAsyncFn'
import ProUpload from 'Src/components/ProUpload/ProUpload'

export interface ILoginProps {}

enum LoginTab {
  email,
  mobile,
}

export default function Login(props: ILoginProps) {
  const [tabKey, setTabKey] = React.useState(LoginTab.email)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    getValues,
    setError,
  } = useForm<LoginParams>({
    defaultValues:
      tabKey === LoginTab.email
        ? ({ email: '1191893756@qq.com', code: '1123', img: 'er花' } as loginByEmailParams)
        : ({ mobile: 18967129601, code: '1122', countryCode: 86 } as loginByMobileParams),
  })
  const [infoState, setInfoState] = React.useState<null | InfoSetResponse>(null)

  const btnSet = () => {
    setValue('email', 'duixr')
    setValue('code', '123456')
    setValue('img', '小黑')
  }

  React.useEffect(() => {
    if (tabKey === LoginTab.email) {
      setValue('email', '1191893756@qq.com')
      setValue('code', '123456')
      setValue('img', '小黑')
    } else {
      setValue('mobile', 18967129601)
      setValue('code', '123456')
      setValue('countryCode', 86)
    }
  }, [tabKey])
  /*   const email = useWatch({
    control,
    name: 'email',
    defaultValue: 'default',
  })

  React.useEffect(() => {
    console.log('email--11--', email)
    // setValue('code',email+'nh')
  }, [email]) */

  const getEMail = async () => {
    console.log('getEmail...')
    const emailValue = getValues('email')
    if (!emailValue) {
      setError(
        'email',
        {
          type: 'type',
          message: 'reque',
        },
        { shouldFocus: true },
      )
      return
    }
    const res = await UserCenter.sendEmail({ email: emailValue, type: SEND_EMAIL_TYPE.loginOrRegistor })
    console.log('res ==>', res)
    utils.codeResult({
      res,
      success: (data) => {
        console.log('data===>', data)
      },
    })
  }

  const getInfoSet = async () => {
    // const res = await UserCenter.infoSet()
    // utils.codeResult<InfoSetResponse>({
    //   res,
    //   success: (data) => {
    //     setInfoState(data)
    //   },
    // })
  }

  const [infoSet, doInfo] = useAsyncFn(async () => {
    // const getMail = await getEMail()
    const res = await UserCenter.infoSet()
    return res
    // console.log('res', res)
  }, [])

  const [login, doLogin] = useAsyncFn(async () => {
    console.log('bb-->', bb.current)

    const res = await UserCenter.loginByEmail({ email: 'string', code: 'string', img: 'sss' })
    return res
  }, [])

  const loadings = useLoading([login.loading, infoSet.loading])
  const bb = React.useRef<loginByEmailParams | {}>({})
  const onSubmit = async (params: loginByEmailParams) => {
    console.log('1111-->', params)
    bb.current = params
    doLogin()

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

  const tabKeyHandle = (val: LoginTab) => {
    setTabKey(val)
  }

  return (
    <div>
      <>
        <button onClick={btnSet}>set value</button>
        <h1>
          <ProIcon>&#xe66f;</ProIcon> Login
        </h1>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lc">
            <h2 onClick={() => tabKeyHandle(0)}>Email</h2>
            <div> &nbsp; &nbsp; &nbsp; </div>
            <h2 onClick={() => tabKeyHandle(1)}>Phone</h2>
          </div>

          {/* <Controller
            render={({ field: { onChange, onBlur, value } }) => (
              <ProUpload size={{ width: 100, height: 120 }} onChange={onChange} value={value} />
            )}
            control={control}
            name="img"
          /> */}
          {/* register your input into the hook by invoking the "register" function */}

          {tabKey === LoginTab.email && (
            <React.Fragment>
              <InputWrap>
                <input
                  {...register('email', {
                    required: true,
                    // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                  })}
                />
              </InputWrap>
              {errors.email && <span>This field is required</span>}
            </React.Fragment>
          )}
          {tabKey === 1 && (
            <React.Fragment>
              <InputWrap>
                <input
                  {...register('mobile', {
                    required: true,
                    // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                  })}
                />
              </InputWrap>
              {errors.mobile && <span>This field is required</span>}

              <InputWrap>
                <input
                  {...register('countryCode', {
                    required: true,
                    // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                  })}
                />
              </InputWrap>
              {errors.countryCode && <span>This field is required</span>}
            </React.Fragment>
          )}
          {/* include validation with required or other standard HTML validation rules */}
          <InputWrap>
            <input {...register('code', { required: true })} style={{ fontSize: '20px' }} />
            <ProBtn onClick={doInfo}>get Code</ProBtn>
            {/* <ProBtn onClick={getEMail}>get Code</ProBtn> */}
          </InputWrap>
          {/* errors will return when field validation fails  */}
          {errors.code && <span>This field is required</span>}

          <InputBtn>
            <input type="submit" value="登陆"></input>
          </InputBtn>
          <IsolateReRender control={control} />
        </form>
        <ProBtn onClick={doLogin}>InfoSet</ProBtn>
      </>
      <Pre>{infoSet}</Pre>
      <>
        {/* <Pre>{infoState}</Pre> */}
        {/* <Pre>{login}</Pre> */}
      </>
      <h3>loading</h3>
      <Pre>{loadings}</Pre>
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
