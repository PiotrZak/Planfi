import Desktop from 'layouts/Desktop'
import Mobile from 'layouts/Mobile'
import React from 'react'
import { isMobileOnly } from 'react-device-detect'
import ReactDOM from 'react-dom'
import RoutesList from 'routes/routes'

//todo - in react 18 - there is new hydrateRoot
// reference: https://blog.saeloun.com/2021/07/15/react-18-adds-new-root-api.html

// Create and render a root with hydration.
// const container = document.getElementById('root');
// const root = ReactDOM.hydrateRoot(container, <App name="Saeloun blog" />);

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