import React, { useEffect, useState } from 'react'
import NavBarLoggedIn from '../components/NavBarLoggedIn'
import useAuthStore from '../../store/useAuthStore'
import useGamesStore from '../../store/useGamesStore'
import { Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import GamesComponent from '../components/GamesComponent'
import AdminGamesComponent from './adminComponents/AdminGamesComponent'

function AdminHomePage() {

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
        <div className='flex items-center justify-center h-screen w-full max-w-full'>
            <Loader className='size-10 animate-spin' />
        </div>
      )
    }

  return (
    <div className='w-full max-w-full h-screen'>
        <NavBarLoggedIn />
        <div className='bg-gray-50 w-full p-4 max-w-full h-fit'>
          <div className="flex justify-end w-full max-w-full h-fit">
            <button className='bg-primary text-white px-4 py-2 rounded-md'>Add Game</button>
          </div>
          <div className="flex flex-col justify-center items-center w-full max-w-full max-h-full mt-4">
            {games.map((game, index) => { return (<AdminGamesComponent _id={game._id} name={game.name} description={game.description} availability={game.availability} key={index}/>)})}
          </div>
        </div>
    </div>
  )
}

export default AdminHomePage