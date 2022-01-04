import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/system'
import { ApolloProviderContext } from 'contexts'
import Desktop from 'layouts/Desktop'
import Mobile from 'layouts/Mobile'
import React from 'react'
import { isMobileOnly } from 'react-device-detect'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import RoutesList from 'routes/routes'
import { theme } from 'style'

ReactDOM.render(
  <React.StrictMode>
    <ApolloProviderContext>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isMobileOnly ? (
            <Mobile>
              <RoutesList />
            </Mobile>
          ) : (
            <Desktop>
              <RoutesList />
            </Desktop>
          )}
        </ThemeProvider>
      </BrowserRouter>
    </ApolloProviderContext>
  </React.StrictMode>,
  document.getElementById('root')
)
