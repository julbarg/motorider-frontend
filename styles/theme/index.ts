import { createTheme, Theme } from '@mui/material/styles'
import { grey, red } from '@mui/material/colors'

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: red[900],
    },
    secondary: {
      main: grey[800],
    },
    error: {
      main: red.A400,
    },
    mode: 'light',
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
  },
})

export default theme
