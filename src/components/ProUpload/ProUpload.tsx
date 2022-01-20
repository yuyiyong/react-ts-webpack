import * as React from 'react'
import Upload from 'rc-upload'
import './upload.scss'
import { BeforeUploadFileType, RcFile, UploadProgressEvent, UploadRequestOption } from 'rc-upload/lib/interface'
import HookToast from '../toast/HookToast'
import ProPrograss from '../ProPrograss/ProPrograss'
import Pre from '../Pre/Pre'
import utils from 'Src/utils/utils'
import http from 'Src/utils/http'
import CONST, { UPLOAD_TYPE } from 'Src/consts/CONST'

type ImgType = {
  base64: string
  status?: string
  progress?: number
}

type StateImgType = Record<string, ImgType>
export default function ProUpload({
  onChange,
  value,
  size = { width: 80, height: 100 },
  limitSize,
  disabled,
}: IProUploadProps) {
  // const [prograss, setProgress] = React.useState(0)
  const [stateImg, setStateImg] = React.useState<StateImgType>({})
  // const [src, setSrc] = React.useState<any>('')
  const onSuccessHandle = (response: Record<string, unknown>, file: RcFile, xhr: XMLHttpRequest) => {
    console.log('onSuccessHandle-', response, file)
    utils.codeResult<any>({
      res: response as any,
      success: () => {
        console.log('成功了')
      },
    })
    onChange('nihao')
  }
  const onErrorHandle = (data: any) => {
    console.log('onErrorHandle-', data)
  }
  // const ProgressRef = React.useRef(0)

  const onProgressHandle = (event: UploadProgressEvent, file: RcFile) => {
    // console.log('onProgressHandle-file---', file)
    if (event.total && event.loaded) {
      refcc.current = Object.assign(refcc.current, {
        [file.uid]: {
          ...(refcc.current as StateImgType)[file.uid],
          progress: (event.loaded / event.total) * 100,
        },
      })
      setStateImg(refcc.current)
    }

    // console.log('refcc.current--22--', refcc.current)

    // setStateImg()

    // React.useCallback(() => {
    //   if (event.total && event.loaded) {
    //     // setProgress((event.loaded / event.total) * 100)
    //     ProgressRef.current = (event.loaded / event.total) * 100
    //   }
    // }, [event.loaded, file])
  }

  const beforeUploadHandle: (
    file: RcFile,
    FileList: RcFile[],
  ) => BeforeUploadFileType | Promise<void | BeforeUploadFileType> = (file: RcFile, FileList: RcFile[]) => {
    // console.log('file---', file)
    // console.log('FileList---', FileList)
    let flag = true
    let islimitSize = true
    if (FileList && FileList.length > 0) {
      FileList.forEach((item, index) => {
        if (
          item.type !== 'image/jpg' &&
          item.type !== 'image/jpeg' &&
          item.type !== 'image/png' &&
          item.type !== 'image/gif'
        ) {
          flag = false
        }
        if (limitSize) {
          if (item.size / 1024 / 1024 > limitSize) {
            islimitSize = false
          }
        }
      })
    }
    if (!flag) {
      HookToast('只支持jpg、png、gif格式的图片！')
    }
    if (!islimitSize) {
      HookToast(`文件限制大小${limitSize}M`)
    }
    let state = { ...stateImg }
    if (flag && islimitSize) {
      state = FileList.reduce((old, item, arr) => {
        return Object.assign(old, { [item.uid]: {} })
      }, state)
    }
    // console.log('state---', state)
    setStateImg(state)

    return flag && islimitSize
  }
  const refcc = React.useRef<Record<string, ImgType> | {}>({})
  const dataHandle = (data: any) => {
    const reader = new FileReader()

    reader.readAsDataURL(data)
    reader.onloadend = function (e) {
      // console.log('dataHandle--', data.uid)
      // console.log('e.target?.result--', e.target?.result)
      // setStateImg({ ...stateImg, [data.uid]: e.target?.result })
      refcc.current = { ...refcc.current, [data.uid]: { base64: e.target?.result, status: 'false' } }
      // console.log('refcc.current--', refcc.current)
      setStateImg(refcc.current)
    }

    return data
  }

  const customRequest = ({
    action,
    data,
    file,
    filename,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }: UploadRequestOption<any>) => {
    console.log('file111---', file)
    console.log('data111---', data)
    const formData = new FormData()
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, (data as any)[key])
      })
    }
    formData.append('file', file)
    formData.append('type', UPLOAD_TYPE.ART_IMAGE)
    formData.forEach((item, key) => {
      console.log(key, 'key---', formData.get(key))
    })
    // axios.post(action,formData,{

    // }).then((data) => {
    //   onSuccess && onSuccess({ data, file })
    // })
    // return

    http
      .post(action+'123', formData, {
        headers: {
          ...headers,

          'Content-Type': 'multipart/form-data;',
        },
        onUploadProgress: (params) => {
          onProgress && onProgress(params)
        },
      })
      .then((data) => {
        onSuccess && onSuccess(data)
      })
      .catch((err) => {
        onError && onError(err)
      })
  }
  return (
    <React.Fragment>
      <Pre>{stateImg}</Pre>
      <div>
        {Object.keys(stateImg).length > 0 &&
          Object.keys(stateImg).map((item, index) => {
            return (
              <>
                <img
                  src={stateImg[item] ? stateImg[item].base64 : ''}
                  style={{ height: size.height, width: size.width, objectFit: 'contain' }}
                />
                {stateImg[item] && stateImg[item].progress ? (
                  <ProPrograss
                    size={{ width: size.width, height: '10px' }}
                    prograss={stateImg[item].progress}
                    // prograss={ProgressRef.current}
                  />
                ) : (
                  <></>
                )}
              </>
            )
          })}
      </div>
      <Upload
        className="hh"
        name="file" // 文件名称
        withCredentials={true} // ajax upload with cookie send
        openFileDialogOnClick={true}
        onSuccess={onSuccessHandle}
        onError={onErrorHandle}
        onProgress={onProgressHandle}
        beforeUpload={beforeUploadHandle}
        multiple={true}
        data={dataHandle}
        method="POST"
        action={`/system-center/oss/upload`}
        disabled={disabled}
        type="drag"
        customRequest={customRequest}
      >
        你好
      </Upload>
      {/* {ProgressRef.current && ProgressRef.current < 99 && (
        <ProPrograss
          size={{ width: size.width, height: '10px' }}
          prograss={ProgressRef.current}
          // prograss={ProgressRef.current}
        />
      )}
      <Pre>prograss--{prograss}</Pre>
      <Pre>ProgressRef.current---{ProgressRef.current}</Pre>
      <div>{value}</div> */}
    </React.Fragment>
  )
}
