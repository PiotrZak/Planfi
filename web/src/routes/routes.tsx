import Categories from 'pages/Categories'
import Plans from 'pages/Plans'
import MyProfile from 'pages/MyProfile'
import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

const RoutesList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MyProfile />} />
      <Route
        path="plans"
        element={
          <PrivateRouteTest roles={[Role.Owner, Role.Trainer, Role.User]} />
        }
      >
        <Route path="/plans" element={<Plans />} />
      </Route>
      <Route
        path="categories"
        element={
          <PrivateRouteTest roles={[Role.Owner, Role.Trainer, Role.User]} />
        }
      >
        <Route path="/categories" element={<Categories />} />
      </Route>
    </Routes>
  )
}

export const Role = {
  Admin: 'Admin',
  Trainer: 'Trainer',
  Owner: 'Owner',
  User: 'User',
}

const PrivateRouteTest = ({ roles } ) => {
  const auth = true
  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default RoutesList
