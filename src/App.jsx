import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import EmployeeDashBoard from './pages/EmployeeDashBoard'
import ManagerDashBoard from './pages/ManagerDashBoard'
import PagenNotFound from './pages/PagenNotFound'
import AdminDashboard from './pages/AdminDashBoard'
function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/manager' element={<ManagerDashBoard/>}/>
      <Route path='/employe' element={<EmployeeDashBoard/>}/>
      <Route path='/*' element={<PagenNotFound/>}/>
    </Routes>
     
    </>
  )
}

export default App
