import React, { useEffect, useState } from 'react'
import NavBarLoggedIn from '../components/NavBarLoggedIn'
import useAuthStore from '../../store/useAuthStore'
import useGamesStore from '../../store/useGamesStore'
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import AdminGamesComponent from './adminComponents/AdminGamesComponent'
import AttendantGameComponent from './attendantComponents/AttendantGameComponent';

function AdminHomePage() {

  const navigate = useNavigate();


  const {authUser} = useAuthStore();
    const {isLoadingGames, games, getGames} = useGamesStore();

    useEffect(() => {
        getGames()
    }, [getGames])

    if (!authUser) {
        return <Navigate to={"/"}/>
    }

    if (isLoadingGames && !games) {
      return (
        <div className='flex items-center justify-center h-screen w-full max-w-full' role="status" aria-live="polite">
            <Loader className='size-10 animate-spin' aria-hidden="true" />
            <span className="sr-only">Loading games</span>
        </div>
      )
    }

  return (
    <div className='w-full max-w-full h-screen'>
        <NavBarLoggedIn />
        <main className='bg-gray-50 w-full p-4 max-w-full h-fit'>
          <div className="flex justify-between items-center w-full max-w-full h-fit">
            <h1 className="font-bold text-2xl">{authUser.admin ? "Manage games" : "Update game status"}</h1>
            {authUser.admin && <button className='bg-primary text-white px-4 py-2 rounded-md cursor-pointer' onClick={() => navigate("/admin-panel/add-game")}>Add Game</button>}
          </div>
          <div className="flex flex-col justify-center items-center w-full max-w-full max-h-full mt-4">
            {games.map((game, index) => {
              if (authUser && authUser.attendant === false && authUser.admin === true) {
                return (<AdminGamesComponent _id={game._id} name={game.name} description={game.description} availability={game.availability} controllersInUse={game.controllersInUse || 0} studentWillingToShare={game.studentWillingToShare || false} key={index}/>)
              } else if (authUser && authUser.attendant === true && authUser.admin === false) {
                return (<AttendantGameComponent 
                  _id={game._id} 
                  name={game.name} 
                  description={game.description} 
                  availability={game.availability} 
                  numberOfControllers={game.numberOfControllers || 1}
                  controllersInUse={game.controllersInUse || 0}
                  studentWillingToShare={game.studentWillingToShare || false}
                  key={index}
                />)
              }
            })}
          </div>
        </main>
    </div>
  )
}

export default AdminHomePage