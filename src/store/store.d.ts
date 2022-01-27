type langState = { t: langType; tKey: LANG }
type themeState = { theme: themType; tTheme: THEME }
interface IUserInfoStore extends InfoSetResponse, ILoginSuccessRes {}
type globalState = { test?: string; userInfo: IUserInfoStore | null } | never

type actionType = { type?: string | number; body?: { [key: string]: string | number | object } }
