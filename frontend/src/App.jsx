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

function App() {

  const {checkAuth, authUser} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log(authUser);
  

  return (
    <>
      <Routes>
        <Route path='/' element={!authUser ? <HomePage /> : <Navigate to={"/dashboard"}/>} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/dashboard"} />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/dashboard"} />} />
        <Route path='/dashboard' element={<DashboardPage />}/>
      </Routes>
      <Toaster />
    </>
  )
}

export default App
