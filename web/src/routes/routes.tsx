import Categories from 'pages/Categories'
import MyProfile from 'pages/MyProfile'
import { Route, Routes } from 'react-router-dom'

const RoutesList: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MyProfile />} />
      <Route path="categories" element={<Categories />} />
    </Routes>
  )
}

export default RoutesList
