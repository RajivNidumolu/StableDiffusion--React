import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const theme = {
  initialColorMode: "dark",
  useSystemColorMode: true,
}

export default extendTheme(theme)