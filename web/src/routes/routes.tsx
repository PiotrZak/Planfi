import Categories from 'pages/Categories'
import MyProfile from 'pages/MyProfile'
import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
// import your route components too


const RoutesList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MyProfile />} />
      <Route path='categories' element={<PrivateRouteTest roles={[Role.Owner, Role.Trainer, Role.User]} />}>
          <Route path='/categories' element={<Categories/>}/>
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
//todo- undisplay in UI, when role sign n
//todo - add complicated logic to routes

//@ts-ignore
const PrivateRouteTest = ({roles}) => {
  //todo - fix with auth role / routing
  const auth = true; 
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

//@ts-ignore
// export const PrivateRoute = ({ element, roles, ...rest }) => (
//   <Route
//     {...rest}
//     //@ts-ignore
//     render={(props: JSX.IntrinsicAttributes) => {
//       //@ts-ignore
//       const currentUser = JSON.parse(localStorage.getItem('user'))
//       if (currentUser === null) {
//         // not logged in so redirect to login page with the return url
//         return (
//           <Navigate
//             //@ts-ignore
//             to={{ pathname: '/login', state: { from: props.location } }}
//           />
//         )
//       }
//       // check if route is restricted by role
//       if (roles && roles.indexOf(currentUser.role.name) === -1) {
//         // role not authorised so redirect to home page
//         return <Navigate to={{ pathname: '/' }} />
//       }
//       // authorised so return component
//       return <Component {...props} />
//     }}
//   />
// )

export default RoutesList;