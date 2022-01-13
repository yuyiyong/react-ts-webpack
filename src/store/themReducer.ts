import { THEME } from 'Src/consts/CONST'
import dark from 'Src/theme/dark'
import light from 'Src/theme/light'

export const defaultTheme: themeState = {
  theme: light,
  tTheme: THEME.light,
}

export const reducerTheme = (state = defaultTheme, action: any = {}) => {
  switch (action.type) {
    case THEME.light:
      return { ...state, theme: light, tTheme: action.type }
    case THEME.dark:
      return { ...state, theme: dark, tTheme: action.type }
    default:
      return state
  }
}
