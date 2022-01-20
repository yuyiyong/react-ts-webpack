import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import ChainsComp from 'Src/components/baseComponents/ChainsComp/ChainsComp'
import CollectionPageComp from 'Src/components/baseComponents/ChainsComp/CollectionPageComp/CollectionPageComp'
import InputBtn from 'Src/components/InputWrap/InputBtn'
import InputWrap from 'Src/components/InputWrap/InputWrap'
import ProBtn from 'Src/components/ProBtn/ProBtn'
import ProductCenter from 'Src/server/ProductCenter'
import utils from 'Src/utils/utils'

export interface ICreatArtProps {}

export default function CreatArt(props: ICreatArtProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm<ICreateArt>({
    defaultValues: {
      gas: 0,
      currencyId: 1,
    },
  })

  const temporaryParamRef = React.useRef<ICheckArt | {}>({}) // 成功清空；密码失败清空；check加上

  const checkArt = async (val: ICheckArt) => {
    val.currencyId = val.currencyId * 1
    val.artCount = val.artCount * 1
    val.collectionId = val.collectionId * 1
    console.log('val---', val)
    const res = await ProductCenter.artAddCheck(val)
    utils.codeResult<any>({
      res,
      success: (data) => {
        console.log('data-->', data)
        temporaryParamRef.current = val
      },
    })
  }

  const createHandle = async () => {
    console.log('temporaryParamRef.current--', temporaryParamRef.current)
    const res = await ProductCenter.artAdd(temporaryParamRef.current as ICreateArt)
    utils.codeResult<any>({
      res,
      success: (data) => {
        console.log('data-->', data)
      },
    })
  }

  return (
    <React.Fragment>
      <h3>CreatArt</h3>
      <form onSubmit={handleSubmit(checkArt)}>
        <b>发行数量</b>
        <InputWrap>
          <input
            type={'number'}
            {...register('artCount', {
              required: true,
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
        </InputWrap>
        {errors.artCount && <span>This field is required</span>}

        <b>链id</b>
        {/* <InputWrap>
          <input
            type={'number'}
            {...register('chainId', {
              required: true,
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
        </InputWrap> */}
        <Controller
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => <ChainsComp onChange={onChange} value={value} />}
          control={control}
          name="chainId"
        />
        {errors.chainId && <span>This field is required</span>}

        <b>作品集</b>
        {/* <InputWrap>
          <input
            {...register('collectionId', {
              required: true,
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
        </InputWrap> */}

        <Controller
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => <CollectionPageComp value={value} onChange={onChange} />}
          control={control}
          name="collectionId"
        />
        {errors.collectionId && <span>This field is required</span>}

        <b>用户支付的gas费-币种id</b>
        <InputWrap>
          <input
            type={'number'}
            {...register('currencyId', {
              required: true,
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
        </InputWrap>
        {errors.currencyId && <span>This field is required</span>}

        <b>作品描述</b>
        <InputWrap>
          <input
            {...register('description', {
              required: true,
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
        </InputWrap>
        {errors.description && <span>This field is required</span>}

        <b>用户支付的gas费</b>
        <InputWrap>
          <input
            type={'number'}
            {...register('gas', {
              required: true,
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
        </InputWrap>
        {errors.gas && <span>This field is required</span>}

        <b>作品名称</b>
        <InputWrap>
          <input
            {...register('name', {
              required: true,
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
        </InputWrap>
        {errors.name && <span>This field is required</span>}

        <b>资金密码</b>
        <InputWrap>
          <input
            type={'password'}
            {...register('safePassword', {
              required: true,
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
        </InputWrap>
        {errors.safePassword && <span>This field is required</span>}

        <b>艺术作品地址</b>
        <InputWrap>
          <input
            {...register('url', {
              required: true,
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
        </InputWrap>
        {errors.url && <span>This field is required</span>}

        <b>userId</b>
        {/* <InputWrap>
          <input
            type={'number'}
            {...register('userId', {
              required: true,
              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
            })}
          />
        </InputWrap>
        {errors.userId && <span>This field is required</span>} */}

        <InputBtn>
          <input type="submit" value="核对"></input>
        </InputBtn>
      </form>
      <ProBtn onClick={createHandle}>输入密码后创建</ProBtn>
    </React.Fragment>
  )
}
