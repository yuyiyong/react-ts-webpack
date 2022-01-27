interface IFormType<T> {
  value: T
  onChange: (T) => void
}
