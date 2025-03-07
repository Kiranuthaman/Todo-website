import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import EmployeeDashBoard from './pages/EmployeeDashBoard'
import ManagerDashBoard from './pages/ManagerDashBoard'
import PagenNotFound from './pages/PagenNotFound'
function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/admin' element={<EmployeeDashBoard/>}/>
      <Route path='/manager' element={<ManagerDashBoard/>}/>
      <Route path='/employe' element={<EmployeeDashBoard/>}/>
      <Route path='/*' element={<PagenNotFound/>}/>
    </Routes>
     
    </>
  )
}

export default App
