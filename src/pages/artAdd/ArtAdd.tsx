import * as React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ChainsComp from 'Src/components/baseComponents/ChainsComp/ChainsComp'
import CollectionPageComp from 'Src/components/baseComponents/ChainsComp/CollectionPageComp/CollectionPageComp'
import InputBtn from 'Src/components/InputWrap/InputBtn'
import InputWrap from 'Src/components/InputWrap/InputWrap'
import Pre from 'Src/components/Pre/Pre'
import ProBtn from 'Src/components/ProBtn/ProBtn'
import ProCard from 'Src/components/ProCard/ProCard'
import ProIcon from 'Src/components/ProIcon/ProIcon'
import ProImgs from 'Src/components/proImgs/ProImgs'
import ModalFooter from 'Src/components/ProModal/ModalFooter'
import ProModal from 'Src/components/ProModal/ProModal'
import ProTabs from 'Src/components/ProTabs/ProTabs'
import ProUpload from 'Src/components/ProUpload/ProUpload'
import PwIcon from 'Src/components/pwIcon/PwIcon'
import HookToast from 'Src/components/toast/HookToast'
import { AUDIT_STATUS, AUDIT_STATUS_TYPE } from 'Src/consts/CONST'
import usePwIconState from 'Src/hooks/usePwIconState'
import ProductCenter from 'Src/server/ProductCenter'
import utils from 'Src/utils/utils'
import './setting/artAdd.scss'

export interface IArtAddProps {}

type TemporaryParams = { data: boolean; checkArtParams: ICheckArt }

export default function ArtAdd(props: IArtAddProps) {
  const { pwIconState, pwIconOnChange } = usePwIconState()
  const currencyId = 1
  const gas = 0.0
  const [nameArr, setNameArr] = React.useState<string[]>([])
  const [showPwpage, setShowPwpage] = React.useState<boolean>(false)
  const temporaryParamsRef = React.useRef<IArtAddCheckBatchQ | null>(null)
  const navigate = useNavigate()
  const initFn = async () => {
    const res = await ProductCenter.artistApplyInfo()
    utils.codeResult({
      res,
      success: (data) => {
        console.log('data-appliy---', data)
        const auditStatus = (data as any).auditStatus as AUDIT_STATUS
        if (auditStatus !== AUDIT_STATUS.TO_PASS) {
          HookToast('艺术家' + AUDIT_STATUS_TYPE[auditStatus])
          navigate('/noCreate')
        }
      },
    })
  }
  React.useEffect(() => {
    initFn()
  }, [])
  const tablist = [
    { label: '图片', id: 1 },
    { label: '音乐（即将上线）', id: 2 },
  ]
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
  } = useForm()

  const proUploadOnChange = (val: any) => {
    // val = 'https://cdn.gmduck.com/images/art_image/202201/7ac5c4e0cd083b70a0f4beb2036357b1.jpeg' // TODO:需要删
    console.log('val---', val)
    const tempArr = [...nameArr]
    const index = tempArr.length * 7 + new Date().valueOf()
    setValue(index + '_' + 'url', val)
    tempArr.push(index.toString())
    const tempName = getValues('temporary_' + 'name')
    const tempArtcount = getValues('temporary_' + 'artCount')
    const tempDescription = getValues('temporary_' + 'description')
    if (tempName) {
      setValue(index + '_' + 'name', tempName)
      setValue('temporary_' + 'name', '')
    }

    if (tempArtcount) {
      setValue(index + '_' + 'artCount', tempArtcount)
      setValue('temporary_' + 'artCount', '')
    }

    if (tempDescription) {
      setValue(index + '_' + 'description', tempDescription)
      setValue('temporary_' + 'description', '')
    }

    setNameArr(tempArr)
  }
  const cancelModal = () => {
    setShowPwpage(false)
    temporaryParamsRef.current = null
  }

  const checkArt = async (data: any) => {
    const tempName = getValues('temporary_' + 'name')
    const tempArtcount = getValues('temporary_' + 'artCount')
    const tempDescription = getValues('temporary_' + 'description')
    if (tempArtcount || tempName || tempDescription) {
      HookToast.error('图片不能为空')
      return
    }
    console.log('submit---->', data)
    const artList: ArtList[] = nameArr.map((index, key) => {
      return {
        artCount: data[index + '_' + 'artCount'],
        name: data[index + '_' + 'name'],
        description: data[index + '_' + 'description'],
        url: data[index + '_' + 'url'],
      }
    })
    if (!artList || artList.length === 0) {
      HookToast.error('内容不能为空')
      return
    }
    const artAddCheckBatchQ: IArtAddCheckBatchQ = {
      chainId: data.chainId,
      collectionId: data.collectionId,
      gas,
      currencyId,
      artList,
    }
    console.log('artAddCheckBatchQ--->', artAddCheckBatchQ)

    const res = await ProductCenter.artAddCheckBatch(artAddCheckBatchQ)
    utils.codeResult({
      res,
      success: (data) => {
        setShowPwpage(true)
        temporaryParamsRef.current = artAddCheckBatchQ
      },
    })
    return

    // const promiseArr = nameArr.map((index, key) => {
    //   return new Promise(async (resolove, reject) => {
    //     const checkArtParams: ICheckArt = {
    //       chainId: data.chainId,
    //       collectionId: data.collectionId,
    //       gas,
    //       currencyId,
    //       artCount: data[index + '_' + 'artCount'],
    //       name: data[index + '_' + 'name'],
    //       description: data[index + '_' + 'description'],
    //       url: data[index + '_' + 'url'],
    //     }
    //     const res = await ProductCenter.artAddCheck(checkArtParams)
    //     utils.codeResult<any>({
    //       res,
    //       success: (data) => {
    //         console.log('data==>', data)
    //         resolove({ data, checkArtParams })
    //       },
    //       error: (data) => {
    //         reject(data)
    //       },
    //     })
    //   })
    // })
    // Promise.all(promiseArr).then((data) => {
    //   console.log('all------>', data)
    //   setShowPwpage(true)
    //   temporaryParamsRef.current = data as TemporaryParams[]
    // })
  }

  const addHandle = async () => {
    const safePassword = getValues('safePassword')
    console.log('safePassword--', safePassword)
    if (!safePassword) {
      HookToast.error('密码不能为空')
      return
    }
    if (temporaryParamsRef.current) {
      const artAddBatchQ: IArtAddBatchQ = {
        ...temporaryParamsRef.current,
        safePassword,
      }
      console.log('artAddBatchQ--->', artAddBatchQ)
      // return
      const res = await ProductCenter.artAddBatch(artAddBatchQ)
      utils.codeResult({
        res,
        success: (data) => {
          console.log('succss--', data)
          HookToast('创建成功')
          cancelModal()
          setNameArr([])
          reset()
        },
      })

      // const promiseArr = temporaryParamsRef.current.map((item, index) => {
      //   return new Promise(async (resolove, reject) => {
      //     const addParams = {
      //       ...item.checkArtParams,
      //       safePassword,
      //     }
      //     const res = await ProductCenter.artAdd(addParams)
      //     utils.codeResult({
      //       res,
      //       success: (data) => {
      //         resolove(data)
      //       },
      //       error: (data) => {
      //         reject(data)
      //       },
      //     })
      //   })
      // })
      // Promise.all(promiseArr).then((data) => {
      //   console.log('data--->', data)
      // })
    }
  }

  const delArt = (index: string, key: number) => {
    console.log('index--->', index)
    console.log('key--->', key)
    const resArray = [...nameArr]
    //  theArray.splice(index, 1);
    resArray.splice(key, 1)
    console.log('resArray--->', resArray)
    setNameArr(resArray)
  }

  const showModal = () => {
    // setShowPwpage(true)
    reset({ aa: '1231' })
    showPayPw()
  }

  const [payPwVisiable, setPayPwVisiable] = React.useState(false)
  const showPayPw = () => {
    setPayPwVisiable(true)
  }
  const cancelPayPw = () => {
    setPayPwVisiable(false)
  }

  return (
    <div className="add_art_g_wrap">
      <form onSubmit={handleSubmit(checkArt)}>
        <ProCard className="margin_top_15" title="创作NFT">
          <ProTabs list={tablist}></ProTabs>
          {nameArr &&
            nameArr.length > 0 &&
            nameArr.map((index, key) => {
              return (
                <div className="artadd_img_item_wrap" key={key}>
                  <div
                    className="del_icon_div"
                    onClick={() => {
                      delArt(index, key)
                    }}
                  >
                    <ProIcon className="addart_del_icon">&#xe682;</ProIcon>
                  </div>
                  <Controller
                    render={({ field: { onChange, onBlur, value } }) => (
                      <ProImgs size={{ width: 200, height: 200 }} onChange={onChange} value={value} />
                    )}
                    control={control}
                    name={index + '_' + 'url'}
                  />
                  <div className="artadd_img_item_r">
                    <div className="row1">
                      <div className="name_div">
                        <b>作品名称</b>
                        <InputWrap>
                          <input
                            {...register(index + '_' + 'name', {
                              required: true,
                              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                            })}
                            placeholder="作品名称"
                          />
                        </InputWrap>
                        {errors.name && <span className="error_massage_form">This field is required</span>}
                      </div>
                      <div className="sizebox_20"></div>
                      <div className="num_div">
                        <b>发行数量</b>
                        <InputWrap>
                          <input
                            type={'number'}
                            {...register(index + '_' + 'artCount', {
                              required: true,
                              // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                            })}
                          />
                        </InputWrap>
                        {errors.artCount && <span className="error_massage_form">This field is required</span>}
                      </div>
                    </div>

                    <div className="row2">
                      <b>作品描述</b>
                      <InputWrap type="textarea">
                        <textarea
                          rows={3}
                          {...register(index + '_' + 'description', {
                            required: true,
                            // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                          })}
                          style={{ width: '100%' }}
                        />
                      </InputWrap>
                      {errors.description && <span className="error_massage_form">This field is required</span>}
                    </div>
                  </div>
                </div>
              )
            })}
          {/* <Controller
            render={({ field: { onChange, onBlur, value } }) => (
              <ProUpload size={{ width: 100, height: 120 }} onChange={onChange} value={value} />
            )}
            control={control}
            name="img"
          /> */}
          <div className="artadd_img_item_wrap">
            <ProUpload size={{ width: 100, height: 120 }} onChange={proUploadOnChange} value={''} />
            <div className="artadd_img_item_r">
              <div className="row1">
                <div className="name_div">
                  <b>作品名称</b>
                  <InputWrap>
                    <input {...register('temporary_' + 'name', {})} placeholder="作品名称" />
                  </InputWrap>
                  {errors.name && <span className="error_massage_form">This field is required</span>}
                </div>
                <div className="sizebox_20"></div>
                <div className="num_div">
                  <b>发行数量</b>
                  <InputWrap>
                    <input type={'number'} {...register('temporary_' + 'artCount', {})} />
                  </InputWrap>
                  {errors.artCount && <span className="error_massage_form">This field is required</span>}
                </div>
              </div>

              <div className="row2">
                <b>作品描述</b>
                <InputWrap type="textarea">
                  <textarea rows={3} {...register('temporary_' + 'description', {})} style={{ width: '100%' }} />
                </InputWrap>
                {errors.description && <span className="error_massage_form">This field is required</span>}
              </div>
            </div>
          </div>

          {/* //////////////////////////////////// */}
          <div className="art_add_line"></div>
          <div className="aart_add_card_title">作品集</div>
          <Controller
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CollectionPageComp value={value} onChange={onChange} />
            )}
            control={control}
            name="collectionId"
          />
          {errors.collectionId && <span className="error_massage_form">This field is required</span>}
          <div className="margin_top_15"></div>
          <div className="aart_add_card_title">链id</div>
          <Controller
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => <ChainsComp onChange={onChange} value={value} />}
            control={control}
            name="chainId"
          />
          {errors.chainId && <span className="error_massage_form">This field is required</span>}
        </ProCard>

        <div className="add_art_card_bottom">
          <div className="aart_add_card_title">
            创作手续费：<span>~¥{gas}</span>
          </div>
          <InputBtn className="submit_addart_btn">
            <input type="submit" value="确认" />
          </InputBtn>

          <ProBtn onClick={showModal}>modal</ProBtn>
        </div>
      </form>
      <ProModal
        className="artadd_pw_modal_wrap_g"
        width={360}
        title="安全验证"
        visible={showPwpage}
        onCancel={cancelModal}
        onOk={() => {}}
        footer={false}
      >
        <form>
          <div className="artadd_modal_content_wrap">
            <InputWrap type="modal">
              <input
                {...register('safePassword', {
                  // required: true,
                })}
                placeholder="请输入资产密码"
                type={pwIconState}
              />
              <PwIcon onChange={pwIconOnChange} />
            </InputWrap>
            {errors.name && <span className="error_massage_form">必填</span>}
          </div>

          <ModalFooter>
            <ProBtn className="artadd_modal_btn" onClick={addHandle}>
              确定
            </ProBtn>
          </ModalFooter>
        </form>
      </ProModal>
      {/* 充值 和 密码 */}
      <ProModal
        visible={payPwVisiable}
        onCancel={cancelPayPw}
        onOk={() => {
          cancelPayPw()
        }}
        footer={true}
      >
        <div className="artadd_paypw_modal_content">账户可用余额不足，请前往APP充值</div>
        <div className="artadd_paypw_modal_content">您当前未设置资产密码，不能支付。请前往APP设置</div>
      </ProModal>
    </div>
  )
}
