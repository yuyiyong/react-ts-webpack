type langState = { t: langType; tKey: LANG }
type themeState = { theme: themType; tTheme: THEME }
type globalState = { test?: string } | never

type actionType = { type?: string | number; body?: { [key: string]: string | number | object } }
