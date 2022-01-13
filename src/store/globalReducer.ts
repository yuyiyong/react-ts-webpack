export const defaultGlabal: globalState = {
  test: '我是test',
}

export const TEST_TYPE = 'test'

export const reducerGlobal = (state = defaultGlabal, action: actionType = {}) => {
  switch (action.type) {
    case TEST_TYPE:
      return setTest(state, action)

    default:
      return {
        ...state,
      }
  }
}

const setTest =  (state: globalState, action: actionType) => {
  console.log('44444--')

  const { body } = action
  let params = { ...state }
  console.log('555--', body)

  if (body && body.test) {
    if (typeof body.test === 'string') {
      params = {
        ...state,
        test: body.test,
      }
    }
  }
  return params
}

const asyncFun = async () => {
  console.log('11111--')

  const pros = () =>
    new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          console.log('22222--')
          resolve('我是里面async的值')
        }, 2000)
      } catch (error) {
        reject(error)
      }
    })
  const res = await pros()
  console.log('res--', res)

  return res
}
