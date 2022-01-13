import React, { useEffect, useRef, useState } from 'react'
import VirtualList from 'react-tiny-virtual-list'
import useAsyncFn from 'Src/hooks/useAsyncFn'
import useLoading from 'Src/hooks/useLoading'
import utils from 'Src/utils/utils'
// import { ICustomerListProps } from './CustomerList.d'

const CustomerList = ({ renderItem, height, itemSize, request }: ICustomerListProps) => {
  const [data, setdata] = useState<any>([])
  const lastPageRef = useRef(false)
  // const [loading, setLoading] = useState(false)
  const pageNumRef = useRef<number>(1)
  const promiseFn = async () => {
    return new Promise<any[]>(async (resolve, reject) => {
      const res: ResType<any[]> = await request({ pageNum: pageNumRef.current })
      utils.codeResult<any[]>({
        res,
        success: (resData, page) => {
          console.log('page===>', page)
          // 是否是最后页，当前页+1/取下一页
          if (page) {
            lastPageRef.current = page.lastPage
            pageNumRef.current = page.nextPage
          }
          // 数组添加
          const newData = [...data, ...resData]
          setdata(newData)

          console.log('data===>', data)
          resolve(newData)
        },
      })
      // setTimeout(() => {
      //   console.log('开始')
      //   const newdata = [...data]
      //   for (let i = 0; i < 200; i++) {
      //     newdata.push(<p key={i + new Date().valueOf()}>new add great content... {i}</p>)
      //   }
      //   console.log('new data----', newdata)
      //   setdata(newdata)
      //   setLoading(false)
      //   resolve(newdata)
      // }, 3000)
    })
  }
  // useEffect(()=>{

  // },[])

  const [state, doFetch] = useAsyncFn(async () => {
    return await promiseFn()
  }, [ promiseFn])

  useLoading([state.loading])

  const testArr = () => {
    const arr = []
    for (let i = 0; i < 20; i++) {
      arr.push(<p key={i + new Date().valueOf()}>Some great content... {i}</p>)
    }
    return arr
  }
  useEffect(() => {
    setdata(testArr())
  }, [])
  

  useEffect(() => {
    console.log('data===>', data)
    console.log('state===>', state)
  }, [data, state])

  const onScroll = (pos: any) => {
    // console.log("post--->", pos);
  }
  const onItemsRendered = (val: any) => {
    // console.log("val-->", val);
    // console.log("val.stopIndex-->", val.stopIndex);
    if (!state.loading && val.stopIndex === data.length - 1 && !lastPageRef.current) {
      // 还差一个没有数据了
      doFetch()
      console.log('已经到底部')
    }
  }
  useEffect(() => {
    doFetch()
  }, [])

  return (
    <VirtualList
      // scrollToIndex={9}
      width="100%"
      height={height}
      itemCount={state.value && state.value.length > 0 ? state.value.length : 0}
      itemSize={itemSize} // Also supports variable heights (array or function getter)
      renderItem={({ index, style }) => (state.value ? renderItem({ index, style, item: state.value[index] }) : <></>)}
      onScroll={onScroll}
      onItemsRendered={onItemsRendered}
    />
  )
}

export default CustomerList
