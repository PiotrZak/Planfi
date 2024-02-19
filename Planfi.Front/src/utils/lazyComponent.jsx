import React, { Suspense } from 'react'
import Loader from '../components/atoms/Loader';

export const withLazyComponent = (LazyComponent) => {
  return (props) => (
    <Suspense fallback={<Loader/>}>
      <LazyComponent {...props} />
    </Suspense>
  )
}
