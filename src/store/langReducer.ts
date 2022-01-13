import { LANG } from 'Src/consts/CONST'
import En from 'Src/lang/en'
import Cn from 'Src/lang/cn'

export const defaultState: langState = {
  t: Cn,
  tKey: LANG.cn,
}

export const reducerLang = (state = defaultState, action: any = {}) => {
  switch (action.type) {
    case LANG.cn:
      return { ...state, t: Cn, tKey: LANG.cn }
    case LANG.en:
      return { ...state, t: En, tKey: LANG.en }
    default:
      return state
  }
}


