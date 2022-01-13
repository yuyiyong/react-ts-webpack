import * as React from 'react'
import { defaultGlabal, reducerGlobal } from './globalReducer'
import { defaultState, reducerLang } from './langReducer'
import { defaultTheme, reducerTheme } from './themReducer'
export interface IStoreProviderProps {
  children: React.ReactNode
}

const StoreThemeContext: React.Context<any> = React.createContext(null)
const StoreLangContext: React.Context<any> = React.createContext(null)
const StoreGlobalContext: React.Context<any> = React.createContext(null)

export function StoreProvider(props: IStoreProviderProps) {
  const [langState, dispatchLang] = React.useReducer(reducerLang, defaultState)
  const [themeState, dispatchTheme] = React.useReducer(reducerTheme, defaultTheme)
  const [globalState, dispatchGlobal] = React.useReducer(reducerGlobal, defaultGlabal)

  return (
    <StoreGlobalContext.Provider value={{ globalState, dispatchGlobal }}>
      <StoreThemeContext.Provider value={{ themeState, dispatchTheme }}>
        <StoreLangContext.Provider value={{ langState, dispatchLang }}>{props.children}</StoreLangContext.Provider>
      </StoreThemeContext.Provider>
    </StoreGlobalContext.Provider>
  )
}

export const useStore = () => React.useContext(StoreLangContext)
export const useThemeStore = () => React.useContext(StoreThemeContext)
export const useGlobalStore = () => React.useContext(StoreGlobalContext)
