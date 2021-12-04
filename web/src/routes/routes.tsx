import Categories from 'pages/Categories'
import MyProfile from 'pages/MyProfile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import your route components too

const RoutesList: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="teams" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesList
