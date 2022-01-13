declare module '*.css' {
  const content: any
  export default content
}
declare module '*.scss' {
  const content: any
  export default content
}

type FunctionReturningPromise = (...args: any[]) => Promise<any>

interface CustomerListRenderItemType<T> {
  index: number
  style: any
  item: T
}
type CustomerListRenderItem<T> = (params: CustomerListRenderItemType<T>) => React.ReactNode

type CustomerListRequestFn = ({ pageNum: number })=>Promise<any>

interface ICustomerListProps {
  renderItem: CustomerListRenderItem
  height: number
  itemSize:number
  request:CustomerListRequestFn
}
