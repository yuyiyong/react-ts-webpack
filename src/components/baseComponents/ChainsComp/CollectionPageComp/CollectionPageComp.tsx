import * as React from 'react'
import { useForm } from 'react-hook-form'
import InputBtn from 'Src/components/InputWrap/InputBtn'
import InputWrap from 'Src/components/InputWrap/InputWrap'
import Pre from 'Src/components/Pre/Pre'
import ProBtn from 'Src/components/ProBtn/ProBtn'
import ModalFooter from 'Src/components/ProModal/ModalFooter'
import ProModal from 'Src/components/ProModal/ProModal'
import HookToast from 'Src/components/toast/HookToast'
import useAsyncFn from 'Src/hooks/useAsyncFn'
import ProductCenter from 'Src/server/ProductCenter'
import utils from 'Src/utils/utils'
import './collectionPage.scss'

export interface ICollectionPageCompProps {
  value: number
  onChange: (val: number) => void
}

export default function CollectionPageComp({ value, onChange }: ICollectionPageCompProps) {
  const [state, dofetch] = useAsyncFn(async () => {
    const res = await ProductCenter.artistCollectionPage()
    return utils.codeResult({
      res,
      success: (data) => {
        console.log('data===>', data)
      },
      error:()=>{
        
      }
    })
  }, [])

  const [visiable, setVisiable] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    setValue,
  } = useForm()

  React.useEffect(() => {
    dofetch()
  }, [])

  const clickHandle = (val: ICollectionPage) => {
    console.log('val---', val)
    onChange(val.id)
  }

  const showModal = () => {
    setVisiable(true)
  }
  const cancelModal = () => {
    setVisiable(false)
    setValue('name', '')
  }
  //   const onSubmit = async (data: any) => {
  //     const res = await ProductCenter.artistCollectionAdd(data)
  //     utils.codeResult({
  //       res,
  //       success: () => {
  //         HookToast('添加成功')
  //         cancelModal()
  //         dofetch()
  //       },
  //     })
  //   }
  const okHandle = async () => {
    const name = getValues('name')
    console.log('name', name)

    if (!name) {
      setError('name', { type: 'onBlur', message: 'requer' }, { shouldFocus: true })
      return
    }
    const res = await ProductCenter.artistCollectionAdd({ name })
    utils.codeResult({
      res,
      success: () => {
        HookToast('添加成功')
        cancelModal()
        dofetch()
      },
    })
  }
  return (
    <div className="collection_wrap_g">
      {/* <Pre>{value}</Pre> */}
      {state.value &&
        state.value.length > 0 &&
        state.value.map((item, key) => (
          <div
            className={'cpc_nomorl_block ' + (item.id === value && 'cpc_active_block')}
            onClick={() => {
              clickHandle(item)
            }}
            key={key}
          >
            {item.name}
          </div>
        ))}
      <div className="collection_p_btn" onClick={showModal}>
        {' '}
        + 添加作品集{' '}
      </div>
      <ProModal title="添加作品集" visible={visiable} onCancel={cancelModal} onOk={okHandle} footer={false}>
        <form className="add_collection_page_modal_wrap">
          <InputWrap type="modal">
            <input
              {...register('name', {
                required: true,
              })}
              placeholder='请输入作品集名称'
            />
          </InputWrap>
          {errors.name && <span className='error_massage_form'>作品集名称不能为空</span>}

          <div className='collection_modal_subtitle'>作品集名称创建后不可修改或删除</div>
          {/* <ModalFooter>
            <InputBtn>
              <input type={'submit'} value={'提交'} />
            </InputBtn>
            <ProBtn onClick={cancelModal}>取消</ProBtn>
          </ModalFooter> */}
        </form>
        <ModalFooter>
          <ProBtn className="artadd_modal_btn" onClick={okHandle}>
            保存
          </ProBtn>
        </ModalFooter>
      </ProModal>
    </div>
  )
}
