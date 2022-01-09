import { createTheme } from '@mui/material'
import { PoppinsLight, PoppinsMedium, PoppinsSemiBold } from './fonts'

export default createTheme({
  palette: {
    primary: {
      main: 'rgba(243, 115, 70, 1)',
      light: 'rgba(245, 143, 107, 1)',
      dark: 'rgba(170, 80, 49, 1)',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: 'rgba(214, 216, 223, 1)',
      light: 'rgba(240, 240, 248, 1)',
      dark: 'rgba(166, 166, 178, 1)',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: 'rgba(17, 18, 20, 0.87)',
      secondary: 'rgba(17, 18, 20, 0.6)',
      disabled: 'rgba(17, 18, 20, 0.38)',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      focus: 'rgba(0, 0, 0, 0.12)',
    },
    divider: 'rgba(17, 18, 20, 0.12)',
    error: {
      main: 'rgba(219, 102, 93, 1)',
      dark: 'rgba(166, 65, 57, 1)',
      light: 'rgba(250, 193, 189, 1)',
      contrastText: 'rgba(255, 255, 255, 1)',
    },
    info: {
      main: 'rgba(33, 150, 243, 1)',
      dark: 'rgba(11, 121, 208, 1)',
      light: 'rgba(100, 182, 247, 1)',
      contrastText: 'rgba(255, 255, 255, 1)',
    },
  },
  typography: {
    fontFamily: 'Poppins',
    h1: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      fontSize: '96px',
    },
    h2: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      fontSize: '60px',
    },
    h3: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      fontSize: '48px',
    },
    h4: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      fontSize: '34px',
    },
    h5: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      fontSize: '24px',
    },
    h6: {
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      fontSize: '20px',
    },
    subtitle1: {
      fontFamily: 'Poppins',
      fontWeight: 'semibold',
      fontSize: '16px',
    },
    subtitle2: {
      fontFamily: 'Poppins',
      fontWeight: 'semibold',
      fontSize: '14px',
    },
    body1: {
      fontFamily: 'Poppins',
      fontWeight: 'Regular',
      fontSize: '16px',
    },
    body2: {
      fontFamily: 'Poppins',
      fontWeight: 'Regular',
      fontSize: '14px',
    },
    caption: {
      fontFamily: 'Poppins',
      fontWeight: 'Regular',
      fontSize: '12px',
    },
    overline: {
      fontFamily: 'Poppins',
      fontWeight: 'Regular',
      fontSize: '12px',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: "Poppins";
          font-style: normal;
          src: url(${PoppinsMedium});

        }
        @font-face {
          font-family: "Poppins";
          src: url(${PoppinsSemiBold});
          font-weight: 700;
        }
        @font-face {
          font-family: "Poppins";
          src: url(${PoppinsLight});
          font-weight: 300;
        }
      `,
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none !important',
          borderBottom: '1px solid rgba(17, 18, 20, 0.12)',
          borderRadius: '0px',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        // Name of the slot
        root: {
          boxShadow: 'none !important',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.6)',
        },
      },
    },
  },
})
