export async function strPromise() {
  return 'string promise'
}

// 我想得到personPromise返回的类型
interface Person {
  name: string
  age: number
}

async function persionPromise() {
  // persionPromise(): Promise<Person>
  return {
    name: 'p',
    age: 12,
  } as Person
}

type PromiseResType<T> = T extends Promise<infer R> ? R : T
type PersonPromise = ReturnType<typeof persionPromise> // Promise<Person>
type PersonPromiseRes = PromiseResType<PersonPromise> // Person

type StrPromise = ReturnType<typeof strPromise>

type StrPromiseRes = PromiseResType<StrPromise>

const ps: () => Person = () => ({ name: '123', age: 11 })

type res<T>  = ReturnType<typeof ps>
