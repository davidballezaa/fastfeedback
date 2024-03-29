import { AuthProvider } from '../lib/auth'
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme} resetCSS>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
