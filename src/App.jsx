import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import EmployeeDashBoard from './pages/EmployeeDashBoard'
import ManagerDashBoard from './pages/ManagerDashBoard'
import PagenNotFound from './pages/PagenNotFound'
import AdminDashboard from './pages/AdminDashBoard'
import TaskStatus from './pages/TaskStatus'
import ManagerTask from './pages/ManagerTask'
function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      <Route path='/admin/status' element={<TaskStatus/>}/>
      <Route path='/manager' element={<ManagerDashBoard/>}/>
      <Route path='/manager/status' element={<ManagerTask/>}/>
      <Route path='/employe' element={<EmployeeDashBoard/>}/>
      <Route path='/*' element={<PagenNotFound/>}/>
    </Routes>
     
    </>
  )
}

export default App
