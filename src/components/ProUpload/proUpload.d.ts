type SizeType = { width: number | string; height: number | string }

type IValue = string | string[]
interface IProUploadProps {
  onChange: (val: IValue) => void
  value: IValue
  size?: SizeType
  limitSize?: number
  disabled?: boolean
}
