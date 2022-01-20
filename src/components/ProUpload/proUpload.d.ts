type SizeType = { width: number | string; height: number | string }
interface IProUploadProps {
  onChange: (...event: any[]) => void
  value: string
  size?: SizeType
  limitSize?: number
  disabled?:boolean
}
