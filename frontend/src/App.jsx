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

function App() {

  const {checkAuth, authUser} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log(authUser);
  

  return (
    <>
      <Routes>
        <Route path='/' element={!authUser ? <HomePage /> : (!authUser.admin ? <Navigate to={"/dashboard"} /> : <Navigate to={"/admin-panel"} />)} />
        <Route path='/login' element={!authUser ? <LoginPage /> : (!authUser.admin ? <Navigate to={"/dashboard"} /> : <Navigate to={"/admin-panel"} />)} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : (!authUser.admin ? <Navigate to={"/dashboard"} /> : <Navigate to={"/admin-panel"} />)} />
        <Route path='/dashboard' element={<DashboardPage />}/>
        <Route path='/admin-panel' element={<AdminHomePage />}/>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
