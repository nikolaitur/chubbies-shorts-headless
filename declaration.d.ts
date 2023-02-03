import { ThemeType } from '@solo-brands/ui-library.providers.theme-provider'
import { theme } from '@solobrands/token-library/dist/styled/chubbies'
import 'styled-components'

type ThemeType = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}

declare module '*.module.css'
