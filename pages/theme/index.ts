import { createTheme, Theme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: red[900],
    },
    secondary: {
      main: grey[700],
    },
    error: {
      main: red.A400,
    },
    mode: 'light',    
  },
});

export default theme;