import * as React from 'react'
import { Control, useForm, useWatch } from 'react-hook-form'
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
  } = useForm<loginByEmailParams>({ defaultValues: { email: '1191893756@qq.com', code: '1123' } })
  const [infoState, setInfoState] = React.useState<null | InfoSetResponse>(null)

  const btnSet = () => {
    setValue('email', 'duixr')
    setValue('code', '123456')
  }
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

    const res = await UserCenter.loginByEmail({ email: 'string', code: 'string' })
    return res
  }, [])

  const loadings = useLoading([login.loading, infoSet.loading])
  const bb = React.useRef<loginByEmailParams | {}>({})
  const onSubmit = async (params: loginByEmailParams) => {
    console.log('1111-->', params)
    bb.current = params
    console.log('doLogin---', doLogin)
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

  return (
    <div>
      <>
        <button onClick={btnSet}>set value</button>
        <h2>
          <ProIcon>&#xe66f;</ProIcon> Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}

          <InputWrap>
            <input
              {...register('email', {
                required: true,
                // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
              })}
            />
          </InputWrap>
          {errors.email && <span>This field is required</span>}

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
