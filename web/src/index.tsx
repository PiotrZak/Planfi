import Desktop from 'layouts/Desktop'
import Mobile from 'layouts/Mobile'
import React from 'react'
import { isMobileOnly } from 'react-device-detect'
import ReactDOM from 'react-dom'
import RoutesList from 'routes/routes'

ReactDOM.render(
  <React.StrictMode>
    {isMobileOnly ? (
      <Mobile>
        <RoutesList />
      </Mobile>
    ) : (
      <Desktop>
        <RoutesList />
      </Desktop>
    )}
  </React.StrictMode>,
  document.getElementById('root')
)
