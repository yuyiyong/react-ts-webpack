import * as React from 'react'
import { IOS_APP_DOWNLOAD_URL } from 'Src/consts/CONST'
import useAsyncFn from './useAsyncFn'

export interface IuseAppDownloadUrlProps {}

export default function useAppDownloadUrl(props: IuseAppDownloadUrlProps) {
  const [state, doFetch] = useAsyncFn(async () => {
    const res: VerType = await fetch('https://static.gmduck.com/apps/prod/ver.json', {
      mode: 'cors',
    }).then((response) => response.json())
    // retrun android_updateurl;
    return { android: res.android_updateurl, ios: IOS_APP_DOWNLOAD_URL }
  }, [])
  React.useEffect(() => {
    doFetch()
  }, [])
  return { downUrlState: state }
}
