import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import createEmotionCache from './theme/createEmotionCache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { Provider } from 'next-auth/client'
import Head from 'next/head'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface AppPropsEmotion extends AppProps {
  emotionCache?: EmotionCache
}

export const MotoRiderApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsEmotion) => {
  return (
    <>
      <Provider session={pageProps.session}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Head>
              <title>Moto Rider App</title>
            </Head>
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </>
  )
}

export default MotoRiderApp
