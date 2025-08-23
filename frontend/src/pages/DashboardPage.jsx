import React, { useEffect } from 'react'
import NavBarLoggedIn from '../components/NavBarLoggedIn'
import useAuthStore from '../../store/useAuthStore'
import useGamesStore from '../../store/useGamesStore'
import { Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import GamesComponent from '../components/GamesComponent';

function DashboardPage() {

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
        <div className='flex items-center justify-center h-screen'>
            <Loader className='size-10 animate-spin' />
        </div>
      )
    }

  return (
    <>
      <NavBarLoggedIn />
      <div className="bg-gray-50 h-screen max-w-full flex justify-center p-4">
        {!games ? <h1 className='text-center font-bold text-2xl'>No games found!</h1> : (
          <div className="flex-col justify-center items-center max-w-full max-h-full">
            {games.map((game, index) => { return (<GamesComponent name={game.name} description={game.description} availability={game.availability} key={index} />)})}
          </div>
        )}
      </div>
    </>
  )
}

export default DashboardPage
