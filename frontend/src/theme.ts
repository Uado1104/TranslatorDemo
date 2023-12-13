import { createTheme } from '@mui/material/styles';
import { Color } from './shared/const';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: Color.Primary,
    },
    secondary: {
      main: Color.Secondary,
    },
    info: {
      main: Color.Info,
    },
    success: {
      main: Color.Success,
    },
    warning: {
      main: Color.Warning,
    },
    error: {
      main: Color.Error,
    },
  },
  spacing: 8,
  typography: {
    h1: {
      lineHeight: 1.5,
    },
    h2: {
      lineHeight: 1.5,
    },
    h3: {
      lineHeight: 1.5,
    },
    h4: {
      lineHeight: 1.5,
    },
    h5: {
      lineHeight: 1.5,
    },
    h6: {
      lineHeight: 1.5,
    },
    body1: {
      lineHeight: 1.5,
    },
    body2: {
      lineHeight: 1.5,
    },
  },
});

export default theme;
