type size = { width: number | string; height: number | string }
interface IProUploadProps {
  onChange: (...event: any[]) => void
  value: string
  size?: size
  limitSize?: number
  disabled?:boolean
}
