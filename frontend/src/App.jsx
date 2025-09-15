import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Navigate, Route, Routes} from 'react-router-dom'
import NavBarDefault from './components/NavBarDefault'
import LoginPage from './pages/LoginPage'
import {Toaster} from 'react-hot-toast'
import SignUpPage from './pages/SignUpPage'
import useAuthStore from '../store/useAuthStore'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import AdminHomePage from './adminPanel/AdminHomePage'
import EditGamePage from './adminPanel/EditGamePage'
import AddGamePage from './adminPanel/AddGamePage'

function App() {

  const {checkAuth, authUser} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log(authUser);
  

  return (
    <>
      <Routes>
        <Route path='/' element={!authUser ? <HomePage /> : ((authUser.attendant || authUser.admin) ? <Navigate to={"/admin-panel"} /> : <Navigate to={"/dashboard"} />)} />
        <Route path='/login' element={!authUser ? <LoginPage /> : (authUser.attendant || authUser.admin) ? <Navigate to={"/admin-panel"} /> : <Navigate to={"/dashboard"} />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : (authUser.attendant || authUser.admin) ? <Navigate to={"/admin-panel"} /> : <Navigate to={"/dashboard"} />} />
        <Route path='/dashboard' element={<DashboardPage />}/>
        <Route path='/admin-panel' element={<AdminHomePage />}/>
        <Route path='/admin-panel/edit-game/:_id' element={<EditGamePage />} />
        <Route path='/admin-panel/add-game/' element={<AddGamePage />}/>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
